import {
  fetchAccount,
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'

import type { ZkappWorkerRequest, ZkappWorkerReponse, WorkerFunctions } from './zkappWorker';

export default class ZkappWorkerClient {
  loadSnarkyJS() {
    return this._call('loadSnarkyJS', {});
  };

  setActiveInstanceToBerkeley() {
    return this._call('setActiveInstanceToBerkeley', {});
  };

  loadContract() {
    return this._call('loadContract', {});
  };

  compileContract() {
    return this._call('compileContract', {});
  };

  fetchAccount({ publicKey }: { publicKey: PublicKey }): ReturnType<typeof fetchAccount> {
    const result = this._call('fetchAccount', { publicKey58: publicKey.toBase58() });
    return (result as ReturnType<typeof fetchAccount>);
  };

  initZkappInstance(publicKey: PublicKey) {
    return this._call('initZkappInstance', { publicKey58: publicKey.toBase58() });
  };

  createStartChatTransaction(
    feePayerPrivateKey: PrivateKey,
    transactionFee: number,
    chatName: string,
    users: PublicKey[]
  ) {
    const feePayerPrivateKey58 = feePayerPrivateKey.toBase58();
    return this._call('createStartChatTransaction', { feePayerPrivateKey58, transactionFee, chatName, users });
  };

  proveStartChatTransaction() {
    return this._call('proveStartChatTransaction', {});
  };

  async sendStartChatTransaction() {
    const result = await this._call('sendStartChatTransaction', {});
    return result as string;
  };

  createSetUsernameTransaction(
    feePayerPrivateKey: PrivateKey,
    transactionFee: number,
    username: string,
    users: Field[],
    index: number
  ) {
    const feePayerPrivateKey58 = feePayerPrivateKey.toBase58();
    return this._call('createSetUsernameTransaction', { feePayerPrivateKey58, transactionFee, username, users, index });
  };

  proveSetUsernameTransaction() {
    return this._call('proveSetUsernameTransaction', {});
  };

  async sendSetUsernameTransaction() {
    const result = await this._call('sendSetUsernameTransaction', {});
    return result as string;
  };

  createSendMessageTransaction(
    feePayerPrivateKey: PrivateKey,
    transactionFee: number,
    username: string,
    users: Field[],
    index: number,
    message: string
  ) {
    const feePayerPrivateKey58 = feePayerPrivateKey.toBase58();
    return this._call('createSendMessageTransaction', { feePayerPrivateKey58, transactionFee, username, users, index, message });
  };

  proveSendMessageTransaction() {
    return this._call('proveSendMessageTransaction', {});
  };

  async sendSendMessageTransaction() {
    const result = await this._call('sendSendMessageTransaction', {});
    return result as string;
  };

  createUpdateChatMessagesTransaction(
    feePayerPrivateKey: PrivateKey,
    transactionFee: number,
    username: string,
    users: Field[],
    index: number
  ) {
    const feePayerPrivateKey58 = feePayerPrivateKey.toBase58();
    return this._call('createUpdateChatMessagesTransaction', { feePayerPrivateKey58, transactionFee, username, users, index });
  };

  proveUpdateChatMessagesTransaction() {
    return this._call('proveUpdateChatMessagesTransaction', {});
  };

  async sendUpdateChatMessagesTransaction() {
    const result = await this._call('sendUpdateChatMessagesTransaction', {});
    return result as string;
  };

  getChatMessagesHash() {
    return this._call('getChatMessagesHash', {});
  };

  worker: Worker;

  promises: { [id: number]: { resolve: (res: any) => void, reject: (err: any) => void } };

  nextId: number;

  constructor() {
    this.worker = new Worker(new URL('./zkappWorker.ts', import.meta.url))
    this.promises = {};
    this.nextId = 0;

    this.worker.onmessage = (event: MessageEvent<ZkappWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject }

      const message: ZkappWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}

