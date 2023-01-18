import {
  AccountUpdate,
  CircuitString,
  Field,
  isReady,
  MerkleTree,
  Mina,
  Poseidon,
  PrivateKey,
  PublicKey,
  shutdown,
  UInt64,
} from 'snarkyjs';

import {
  Chat,
  MerkleWitnessClass
} from './Chat';
import { Message } from './Message';
import { User } from './User';

const DEFAULT_USERNAME = "DEFAULT_USERNAME";
const MAX_MERKLE_TREE_HEIGHT = 8; // Max 2^32 users are allowed in chat

// let chatName = "Test Chat";
let messages: Message[] = []; // Offchain storage to test
let users: Field[] = []; // Offchain storage to test

let testAccounts: {
  publicKey: PublicKey;
  privateKey: PrivateKey;
}[];

function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  testAccounts = Local.testAccounts;
  return Local.testAccounts[0].privateKey;
};

describe('Chat', () => {
  let deployerAccount: PrivateKey,
    zkAppAddress: PublicKey,
    zkAppPrivateKey: PrivateKey,
    zkAppInstance: Chat;

  beforeAll(async () => {
    await isReady;
    deployerAccount = createLocalBlockchain();
    zkAppPrivateKey = PrivateKey.random();
    zkAppAddress = zkAppPrivateKey.toPublicKey();
    zkAppInstance = new Chat(zkAppAddress);

    const txn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      
      users = testAccounts.filter((_, i) => i > 0 && i < 4).map(each => (new User(each.publicKey, CircuitString.fromString(DEFAULT_USERNAME)).hash()));

      zkAppInstance.deploy({ zkappKey: zkAppPrivateKey });
    });
    await txn.send();
  });

  afterAll(async () => {
    setTimeout(shutdown, 0);
  });

  it('generates and deploys the `Chat` smart contract', async () => {
    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < users.length; i++)
      usersTree.setLeaf(BigInt(i), users[i]);

    const messagesTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < users.length; i++)
      messagesTree.setLeaf(BigInt(i), users[i]);

    const txn = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.startChat(
        usersTree.getRoot()
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send();

    expect(zkAppInstance.users.get()).toEqual(usersTree.getRoot());
  });

  it('first user send message', async () => {
    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < users.length; i++)
      usersTree.setLeaf(BigInt(i), users[i]);

    const username = "User 1";

    const txn = await Mina.transaction(deployerAccount, () => {
      expect(zkAppInstance.users.get()).toEqual(usersTree.getRoot());

      zkAppInstance.setUsername(
        testAccounts[1].privateKey,
        CircuitString.fromString(username),
        new MerkleWitnessClass(usersTree.getWitness(BigInt(0))),
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send();

    users[0] = (new User(testAccounts[1].publicKey, CircuitString.fromString(username))).hash();
    usersTree.setLeaf(BigInt(0), users[0]);

    expect(zkAppInstance.users.get()).toEqual(usersTree.getRoot());

    const time = 0;
    const text = "1st Users says hello!!";

    const message = new Message(
      CircuitString.fromString(username),
      UInt64.from(time),
      CircuitString.fromString(text)
    );

    const txn2 = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.sendMessage(
        testAccounts[1].privateKey,
        CircuitString.fromString(username),
        new MerkleWitnessClass(usersTree.getWitness(BigInt(0))),
        message
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn2.send();

    messages.push(message);
  });

  it('second user send message', async () => {
    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < users.length; i++)
      usersTree.setLeaf(BigInt(i), users[i]);

    const username = "User 2";

    const txn = await Mina.transaction(deployerAccount, () => {
      expect(zkAppInstance.users.get()).toEqual(usersTree.getRoot());

      zkAppInstance.setUsername(
        testAccounts[2].privateKey,
        CircuitString.fromString(username),
        new MerkleWitnessClass(usersTree.getWitness(BigInt(1))),
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send();

    users[1] = (new User(testAccounts[2].publicKey, CircuitString.fromString(username))).hash();
    usersTree.setLeaf(BigInt(1), users[1]);

    expect(zkAppInstance.users.get()).toEqual(usersTree.getRoot());

    const time = 1;
    const text = "2st Users replies :DD";

    const message = new Message(
      CircuitString.fromString(username),
      UInt64.from(time),
      CircuitString.fromString(text)
    );

    const txn2 = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.sendMessage(
        testAccounts[2].privateKey,
        CircuitString.fromString(username),
        new MerkleWitnessClass(usersTree.getWitness(BigInt(1))),
        message
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn2.send();

    messages.push(message);
  });

  it('check messages', async () => {
    const usersTree = new MerkleTree(MAX_MERKLE_TREE_HEIGHT);
    for (let i = 0; i < users.length; i++)
      usersTree.setLeaf(BigInt(i), users[i]);

    let messagesHash = Field(0);
    for (let i = 0; i < messages.length; i++)
      messagesHash = Poseidon.hash([ messagesHash, messages[i].hash() ]);

    console.log(messages.map(each => {
      return {
        username: each.username.toString(),
        text: each.text.toString(),
        time: Number(each.time)
      }
    }));

    const username = "User 1";

    const txn = await Mina.transaction(deployerAccount, () => {
      zkAppInstance.updateMessages(
        testAccounts[1].privateKey,
        CircuitString.fromString(username),
        new MerkleWitnessClass(usersTree.getWitness(BigInt(0))),
      );
      zkAppInstance.sign(zkAppPrivateKey);
    });
    await txn.send();

    expect(zkAppInstance.messagesHash.get()).toEqual(messagesHash);
  });
});
