import React, { useEffect, useState } from "react";

import {
  PublicKey,
  PrivateKey,
  CircuitString,
  Field
} from 'snarkyjs'

import { User }  from '../../contracts/build/src/User.js';

import { requestToDatabase } from '../api/server';

import Loading from './loading.page';
import Dashboard from './dashboard.page';

import ZkappWorkerClient from './zkappWorkerClient';

const DEFAULT_USERNAME = "DEFAULT_USERNAME";

let transactionFee = 0;

interface Chat {
  address: string,
  users: {
    publicKey: string,
    hash: string
  }[],
  name: string,
  lastMessage: null | {
    username: string,
    text: string,
    time: number
  }
};

export default function App() {
  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasBeenSetup: false,
    accountExists: false,
    privateKey: null as null | PrivateKey,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
    activeChatAddress: null as null | string,
    activeChatUsername: null as null | string,
    chats: [] as Array<Chat>,
    messages: [
      {
        username: "Username",
        text: "Hello!!",
        time: (new Date).getTime()
      },
      {
        username: "Username 2",
        text: "Hi :DD",
        time: (new Date).getTime() - (2 * 60 * 60 * 1000)
      },
      {
        username: "Username 2",
        text: "How are u guys??",
        time: (new Date).getTime() - (2 * 60 * 60 * 1000)
      },
      {
        username: "Username 1",
        text: "Hello everyone",
        time: (new Date).getTime() - (5 * 60 * 60 * 1000)
      },
      {
        username: "Username 1",
        text: "I am great thanks, how about you?",
        time: (new Date).getTime() - (36 * 60 * 60 * 1000)
      },
      {
        username: "Username 3",
        text: "Did you handle the problems in the ZkChat? cause the last time I have checkd there were some issues with the UI",
        time: (new Date).getTime() - (72 * 60 * 60 * 1000)
      }
    ] as Array<{
      username: string,
      text: string,
      time: number
    }>
  });

  useEffect(() => {
    (async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        await zkappWorkerClient.loadSnarkyJS();
        await zkappWorkerClient.setActiveInstanceToBerkeley();

        if (localStorage.privateKey == null)
          localStorage.privateKey = PrivateKey.random().toBase58();

        let privateKey = PrivateKey.fromBase58(localStorage.privateKey);
        let publicKey = privateKey.toPublicKey();

        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();
        await zkappWorkerClient.compileContract();

        requestToDatabase({
          type: 'get_chats',
          body: {
            user_public_key: publicKey!.toBase58(),
            new_chat: null,
            chat_id: null,
            new_message: null
          }
        }, (err: string, chats: Chat[]) => {
          if (err) return alert(err);
    
          setState({
            ...state,
            zkappWorkerClient,
            hasBeenSetup: true,
            publicKey,
            privateKey,
            accountExists,
            chats
          });
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (state.hasBeenSetup && !state.accountExists) {
        for (;;) {
          console.log('checking if account exists...');
          const res = await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! })
          const accountExists = res.error == null;
          if (accountExists) {
            break;
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        setState({ ...state, accountExists: true });
       }
     })();
  }, [state.hasBeenSetup]);

  async function createChat(data: {
    chatName: string,
    users: PublicKey[]
  }, callback: Function)  {
    if (state.creatingTransaction)
      return callback('transaction_on_process');

    setState({ ...state, creatingTransaction: true });

    const zkappWorkerClient = state.zkappWorkerClient;
    const publicKey = state.publicKey;
    const privateKey = state.privateKey;
    
    const newContractPrivateKey = PrivateKey.random();
    const newContractPublicKey = newContractPrivateKey.toPublicKey();
  
    await zkappWorkerClient!.initZkappInstance(newContractPublicKey);
    await zkappWorkerClient!.fetchAccount({ publicKey: newContractPublicKey });

    await zkappWorkerClient!.createStartChatTransaction(
      privateKey!,
      transactionFee,
      data.chatName,
      data.users
    );

    await zkappWorkerClient!.proveStartChatTransaction();
    const transactionHash = await zkappWorkerClient!.sendStartChatTransaction();

    requestToDatabase({
      type: 'post_chat',
      body: {
        user_public_key: publicKey!.toBase58(),
        new_chat: {
          address: newContractPublicKey.toBase58(),
          users: data.users.map(each => {
            return {
              publicKey: each.toBase58(),
              hash: (new User(each, CircuitString.fromString(DEFAULT_USERNAME)).hash()).toString()
            }
          }),
          name: "Default Chat Name",
          lastMessage: null
        },
        chat_id: null,
        new_message: null
      }
    }, (err: string) => {
      if (err) return alert(err);

      setState({
        ...state,
        creatingTransaction: false,
        chats: state.chats.concat({
          address: newContractPublicKey.toBase58(),
          users: data.users.map(each => {
            return {
              publicKey: each.toBase58(),
              hash: (new User(each, CircuitString.fromString(DEFAULT_USERNAME)).hash()).toString()
            }
          }),
          name: "Default Chat Name",
          lastMessage: null
        })
      });
    });
  };

  async function setUsername(data: {
    chatPublicKey: string,
    username: string
  }, callback: Function)  {
    if (state.creatingTransaction)
      return callback('transaction_on_process');

    setState({ ...state, creatingTransaction: true });

    const zkappWorkerClient = state.zkappWorkerClient;
    const publicKey = state.publicKey;
    const privateKey = state.privateKey;
    
    const newContractPrivateKey = PrivateKey.random();
    const newContractPublicKey = newContractPrivateKey.toPublicKey();
  
    await zkappWorkerClient!.initZkappInstance(newContractPublicKey);
    await zkappWorkerClient!.fetchAccount({ publicKey: newContractPublicKey });

    const chat = state.chats.find(each => each.address == data.chatPublicKey);

    if (!chat) return callback('bad_request');

    const index = chat.users.findIndex(each => each.publicKey == state.publicKey!.toBase58())

    if (index < 0) return callback('bad_request');

    await zkappWorkerClient!.createSetUsernameTransaction(
      privateKey!,
      transactionFee,
      data.username,
      chat.users.map(each => Field(each.hash)),
      index
    );

    await zkappWorkerClient!.proveStartChatTransaction();
    const transactionHash = await zkappWorkerClient!.sendStartChatTransaction();

    // requestToDatabase({
    //   type: 'post_chat',
    //   body: {
    //     user_public_key: publicKey!.toBase58(),
    //     new_chat: {
    //       address: newContractPublicKey.toBase58(),
    //       users: data.users.map(each => {
    //         return {
    //           publicKey: each.toBase58(),
    //           hash: (new User(each, CircuitString.fromString(DEFAULT_USERNAME)).hash()).toString()
    //         }
    //       }),
    //       name: "Default Chat Name",
    //       lastMessage: null
    //     },
    //     chat_id: null,
    //     new_message: null
    //   }
    // }, (err: string) => {
    //   if (err) return alert(err);

    //   setState({
    //     ...state,
    //     creatingTransaction: false,
    //     chats: state.chats.concat({
    //       address: newContractPublicKey.toBase58(),
    //       users: data.users.map(each => each.toBase58()),
    //       name: "Default Chat Name",
    //       lastMessage: null
    //     })
    //   });
    // });
  };

  let setupText = state.hasBeenSetup ? 'SnarkyJS Ready' : 'Setting up SnarkyJS...';
  let setup = <div >{setupText}</div>

  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
    const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
    accountDoesNotExist = <div>
      Account does not exist. Please visit the faucet to fund this account
      <a href={faucetLink} target="_blank" rel="noreferrer"> [Link] </a>
    </div>
  }

  return (
    <div>
      { Loading({
        isReady: !state.hasBeenSetup
      }) }
      { state.hasBeenSetup && !state.accountExists ? accountDoesNotExist : '' }
      { Dashboard({
        isReady: state.hasBeenSetup && state.accountExists,
        chats: state.chats,
        messages: state.messages,
        username: state.activeChatUsername!,
        createChat
      }) }
    </div>
  );
}
