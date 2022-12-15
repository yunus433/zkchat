import {
  Bool,
  CircuitString,
  DeployArgs,
  Field,
  MerkleWitness,
  method,
  Permissions,
  Poseidon,
  PrivateKey,
  Reducer,
  SmartContract,
  state,
  State
} from 'snarkyjs';

import { Message } from './Message';
import { User } from './User';

const MAX_MERKLE_TREE_HEIGHT = 32;
const DEFAULT_USERNAME = "DEFAULT_USERNAME";

export class MerkleWitnessClass extends MerkleWitness(MAX_MERKLE_TREE_HEIGHT) {};

const STATE = {
  DEPLOYED: 0,
  STARTED: 1,
  ENDED: 2
};

export class Chat extends SmartContract {
  @state(Field) state = State<Field>();
  @state(Field) users = State<Field>();
  @state(Field) messagesHash = State<Field>(); 
  @state(Field) messagesAccumulator = State<Field>();

  chatName: string;

  reducer = Reducer({ actionType: Message });

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.setPermissions({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
      editSequenceState: Permissions.proofOrSignature(),
    });
    
    this.state.set(Field(STATE.DEPLOYED));
    this.users.set(Field(0));
    this.messagesHash.set(Field(0));
    this.messagesAccumulator.set(Reducer.initialActionsHash);
  };

  @method startChat(
    users: Field
  ) {
    this.state.assertEquals(Field(STATE.DEPLOYED));
    
    this.users.set(users);
    this.state.set(Field(STATE.STARTED));
  };

  @method setUsername(
    key: PrivateKey,
    username: CircuitString,
    path: MerkleWitnessClass
  ) {
    const user = new User(key.toPublicKey(), CircuitString.fromString(DEFAULT_USERNAME));
    this.users.assertEquals(this.users.get());
    path.calculateRoot(user.hash()).assertEquals(this.users.get());

    const newUser = user.setUsername(username);
    const newUsersTree = path.calculateRoot(newUser.hash());
    this.users.set(newUsersTree);
  };

  @method sendMessage(
    key: PrivateKey,
    username: CircuitString,
    path: MerkleWitnessClass,
    message: Message
  ) {
    (username.equals(CircuitString.fromString(DEFAULT_USERNAME))).assertEquals(Bool(false));

    const user = new User(key.toPublicKey(), username);
    this.users.assertEquals(this.users.get());
    path.calculateRoot(user.hash()).assertEquals(this.users.get());

    message.username.assertEquals(username);

    this.reducer.dispatch(message);
  };

  @method updateMessages(
    key: PrivateKey,
    username: CircuitString,
    path: MerkleWitnessClass
  ) {
    const user = new User(key.toPublicKey(), username);
    this.users.assertEquals(this.users.get());
    path.calculateRoot(user.hash()).assertEquals(this.users.get());

    const messagesAccumulator = this.messagesAccumulator.get();
    this.messagesAccumulator.assertEquals(messagesAccumulator);
    const messages = this.messagesHash.get();
    this.messagesHash.assertEquals(messages);

    const { state: newMessagesHash, actionsHash: newMessagesAccumulator } = this.reducer.reduce(
      this.reducer.getActions({ fromActionHash: messagesAccumulator }), 
      Field,
      (state: Field, action: Message) => {
        return Poseidon.hash([ state, action.hash() ]);
      },
      { state: messages, actionsHash: messagesAccumulator }
    );

    this.messagesAccumulator.set(newMessagesAccumulator);
    this.messagesHash.set(newMessagesHash);
  };
}
