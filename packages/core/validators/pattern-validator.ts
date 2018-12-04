import { FieldValue, IField } from '../models/schema';
import { IValidator } from './validator';

export default class PatternValidator implements IValidator {
  constructor(private name: string, private pattern: RegExp) {}

  public validate = (field: IField, value: FieldValue) => {
    if (value === null || typeof value === 'undefined') {
      return true;
    }

    if (
      !field.validators ||
      !field.validators.length ||
      !field.validators.find((x) => x.name === this.name)
    ) {
      return true;
    }

    return value.toString().match(this.pattern) !== null;
  };
}
