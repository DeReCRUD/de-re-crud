import { IInternalField } from '../internal-schema';
import { FieldValue } from '../models/schema';
import { IValidator } from './validator';

export default class PatternValidator implements IValidator {
  constructor(
    private name: string,
    private pattern: RegExp,
    private negate: boolean = false,
  ) {}

  public validate = (field: IInternalField, value: FieldValue) => {
    if (value === null || typeof value === 'undefined') {
      return true;
    }

    if (
      !field.customValidators ||
      !field.customValidators.length ||
      !field.customValidators.find((x) => x === this.name)
    ) {
      return true;
    }

    const result = value.toString().match(this.pattern) !== null;
    return this.negate ? !result : result;
  };
}
