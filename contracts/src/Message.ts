import {
  CircuitValue,
  CircuitString,
  Field,
  Poseidon,
  prop,
  UInt64
} from 'snarkyjs';

export class Message extends CircuitValue {
  @prop username: CircuitString;
  @prop time: UInt64;
  @prop text: CircuitString;

  constructor(
    username: CircuitString,
    time: UInt64,
    text: CircuitString
  ) {
    super(username, time, text);

    this.username = username;
    this.time = time;
    this.text = text;
  }

  hash(): Field {
    return Poseidon.hash(this.username.toFields().concat(this.time.toFields().concat(this.text.toFields())));
  }
};
