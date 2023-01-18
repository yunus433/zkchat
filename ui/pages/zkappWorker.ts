import {
  CircuitString,
  Mina,
  isReady,
  PublicKey,
  PrivateKey,
  Field,
  fetchAccount,
  MerkleTree,
  UInt64
} from 'snarkyjs'

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

import type { Chat } from '../../contracts/src/Chat';

const DEFAULT_USERNAME = "DEFAULT_USERNAME";
const MAX_MERKLE_TREE_HEIGHT = 8; // Max 2^8 users are allowed

const state = {
  Chat: null as null | typeof Chat,
  zkapp: null as null | Chat,
  startChatTransaction: null as null | Transaction,
  setUsernameTransaction: null as null | Transaction,
  sendMessageTransaction: null as null | Transaction,
  updateMessagesTransaction: null as null | Transaction,
}

const functions = {
  loadSnarkyJS: async (args: {}) => {
    await isReady;
  },
  setActiveInstanceToBerkeley: async (args: {}) => {
    const Berkeley = Mina.BerkeleyQANet(
      "https://proxy.berkeley.minaexplorer.com/graphql"
    );
    Mina.setActiveInstance(Berkeley);
  },
  loadContract: async (args: {}) => {
    const { Chat } = await import('../../contracts/build/src/Chat.js');
    state.Chat = Chat;
  },
  compileContract: async (args: {}) => {
    console.log("here");
    await state.Chat!.compile();
    console.log("compiled");
  },
  fetchAccount: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    return await fetchAccount({ publicKey });
  },
  initZkappInstance: async (args: { publicKey58: string }) => {
    const publicKey = PublicKey.fromBase58(args.publicKey58);
    state.zkapp = new state.Chat!(publicKey);
  },
  createStartChatTransaction: async (args: {
    feePayerPrivateKey58: string,
    transactionFee: number,
    chatName: string,
    users: PublicKey[]
  }) => {
    const { User } = await import ('../../contracts/build/src/User.js');
    const feePayerKey = PrivateKey.fromBase58(args.feePayerPrivateKey58);

    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < args.users.length; i++)
      usersTree.setLeaf(BigInt(i), (new User(args.users[i], CircuitString.fromString(DEFAULT_USERNAME))).hash());

    const transaction = await Mina.transaction(
      { feePayerKey, fee: args.transactionFee },
      () => {
        state.zkapp!.startChat( usersTree.getRoot() );
      }
    );
    state.startChatTransaction = transaction;
  },
  proveStartChatTransaction: async (args: {}) => {
    await state.startChatTransaction!.prove();
  },
  sendStartChatTransaction: async (args: {}) => {
    var txn_res = await state.startChatTransaction!.send();
    const transactionHash = await txn_res!.hash();
    return transactionHash;
  },
  createSetUsernameTransaction: async(args: {
    feePayerPrivateKey58: string,
    transactionFee: number,
    username: string,
    users: Field[], // List of User hashes. Fetch from database
    index: number // Index of user in users hash array
  }) => {
    const { MerkleWitnessClass } = await import ('../../contracts/build/src/Chat.js');

    const feePayerKey = PrivateKey.fromBase58(args.feePayerPrivateKey58);

    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < args.users.length; i++)
      usersTree.setLeaf(BigInt(i), args.users[i]);

    const transaction = await Mina.transaction(
      { feePayerKey, fee: args.transactionFee },
      () => {
        state.zkapp!.setUsername(
          feePayerKey,
          CircuitString.fromString(args.username),
          new MerkleWitnessClass(usersTree.getWitness(BigInt(args.index)))
        );
      }
    );
    state.setUsernameTransaction = transaction;
  },
  proveSetUsernameTransaction: async (args: {}) => {
    await state.setUsernameTransaction!.prove();
  },
  sendSetUsernameTransaction: async (args: {}) => {
    var txn_res = await state.setUsernameTransaction!.send();
    const transactionHash = await txn_res!.hash();
    return transactionHash;
  },
  createSendMessageTransaction: async(args: {
    feePayerPrivateKey58: string,
    transactionFee: number,
    username: string,
    users: Field[], // List of User hashes. Fetch from database
    index: number, // Index of user in users hash array
    message: string
  }) => {
    const { MerkleWitnessClass } = await import ('../../contracts/build/src/Chat.js');
    const { Message } = await import ('../../contracts/build/src/Message.js');

    const feePayerKey = PrivateKey.fromBase58(args.feePayerPrivateKey58);

    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < args.users.length; i++)
      usersTree.setLeaf(BigInt(i), args.users[i]);

    const transaction = await Mina.transaction(
      { feePayerKey, fee: args.transactionFee },
      () => {
        state.zkapp!.sendMessage(
          feePayerKey,
          CircuitString.fromString(args.username),
          new MerkleWitnessClass(usersTree.getWitness(BigInt(args.index))),
          new Message(
            CircuitString.fromString(args.username),
            UInt64.from((new Date()).getTime()),
            CircuitString.fromString(args.message)
          )
        );
      }
    );
    state.sendMessageTransaction = transaction;
  },
  proveSendMessageTransaction: async (args: {}) => {
    await state.sendMessageTransaction!.prove();
  },
  sendSendMessageTransaction: async (args: {}) => {
    var txn_res = await state.sendMessageTransaction!.send();
    const transactionHash = await txn_res!.hash();
    return transactionHash;
  },
  createUpdateChatMessagesTransaction: async (args: {
    feePayerPrivateKey58: string,
    transactionFee: number,
    username: string,
    users: Field[], // List of User hashes. Fetch from database
    index: number // Index of user in users hash array
  }) => {
    const { MerkleWitnessClass } = await import ('../../contracts/build/src/Chat.js');
    
    const feePayerKey = PrivateKey.fromBase58(args.feePayerPrivateKey58);

    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < args.users.length; i++)
      usersTree.setLeaf(BigInt(i), args.users[i]);

    const transaction = await Mina.transaction(
      { feePayerKey, fee: args.transactionFee },
      () => {
        state.zkapp!.updateMessages(
          feePayerKey,
          CircuitString.fromString(args.username),
          new MerkleWitnessClass(usersTree.getWitness(BigInt(args.index)))
        );
      }
    );
    state.startChatTransaction = transaction;
  },
  proveUpdateChatMessagesTransaction: async (args: {}) => {
    await state.updateMessagesTransaction!.prove();
  },
  sendUpdateChatMessagesTransaction: async (args: {}) => {
    var txn_res = await state.updateMessagesTransaction!.send();
    const transactionHash = await txn_res!.hash();
    return transactionHash;
  },
  getChatMessagesHash: async (args: {}) => {
    return await state.zkapp!.messagesHash.get();
  }
};

export type WorkerFunctions = keyof typeof functions;

export type ZkappWorkerRequest = {
  id: number,
  fn: WorkerFunctions,
  args: any
}

export type ZkappWorkerReponse = {
  id: number,
  data: any
}
if (process.browser) {
  addEventListener('message', async (event: MessageEvent<ZkappWorkerRequest>) => {
    const returnData = await functions[event.data.fn](event.data.args);

    const message: ZkappWorkerReponse = {
      id: event.data.id,
      data: returnData,
    }
    postMessage(message)
  });
}
