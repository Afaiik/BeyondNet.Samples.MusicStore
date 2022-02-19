import { StringValueObject } from '../../../shared/domain/valueobjects';

export class Tag extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
