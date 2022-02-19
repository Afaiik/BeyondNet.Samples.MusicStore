import { v4 } from 'uuid';
import validate from 'uuid-validate';
import { InvalidArgumentError } from '../errors/InvalidArgumentError';

export class AggregateId {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static Generate(): AggregateId {
    return new AggregateId(v4());
  }

  private ensureIsValidUuid(id: string): void {
    if (!validate(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }

  toString(): string {
    return this.value;
  }
}
