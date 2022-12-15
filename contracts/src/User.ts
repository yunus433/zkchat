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
  @prop username: CircuitString;

  constructor(
    key: PublicKey,
    username: CircuitString
  ) {
    super(key, username);
    this.key = key;
    this.username = username;
  }

  hash(): Field {
    return Poseidon.hash(this.key.toFields().concat(this.username.toFields()));
  }

  setUsername(
    username: CircuitString
  ): User {
    this.username.assertEquals(CircuitString.fromString(DEFAULT_USERNAME));

    return new User(this.key, username);
  }
};
