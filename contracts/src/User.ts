import {
  CircuitValue,
  CircuitString,
  Field,
  Poseidon,
  prop,
  PublicKey,
} from 'snarkyjs';

const DEFAULT_USERNAME = "DEFAULT_USERNAME";

export class User extends CircuitValue {
  @prop key: PublicKey;
  @prop username: Field;

  constructor(
    key: PublicKey,
    username: CircuitString
  ) {
    super(key, username);
    this.key = key;
    this.username = Poseidon.hash(username.toFields());
  }

  hash(): Field {
    return Poseidon.hash(this.key.toFields().concat(this.username.toFields()));
  }

  setUsername(
    username: CircuitString
  ): User {
    this.username.assertEquals(Poseidon.hash(CircuitString.fromString(DEFAULT_USERNAME).toFields()));

    return new User(this.key, username);
  }
};
