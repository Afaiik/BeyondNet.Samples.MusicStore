import { InvalidArgumentError } from '../../../shared/domain/errors/InvalidArgumentError';
import { StringValueObject } from '../../../shared/domain/valueobjects';

export class AlbumDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsLessThan100Characters(value);
  }

  private ensureLengthIsLessThan100Characters(value: string): void {
    if (value.length > 100) {
      throw new InvalidArgumentError(
        `The Course Name <${value}> has more than 100 characters`
      );
    }
  }
}
