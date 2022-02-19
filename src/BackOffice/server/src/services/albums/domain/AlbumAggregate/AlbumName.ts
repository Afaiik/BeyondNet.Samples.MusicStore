import { InvalidArgumentError } from '../../../shared/domain/errors/InvalidArgumentError';
import { StringValueObject } from '../../../shared/domain/valueobjects';

export class AlbumName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan30Characters(value);
  }

  private ensureLengthIsLessThan30Characters(value: string): void {
    if (value.length > 30) {
      throw new InvalidArgumentError(
        `The Course Name <${value}> has more than 30 characters`
      );
    }
  }
}
