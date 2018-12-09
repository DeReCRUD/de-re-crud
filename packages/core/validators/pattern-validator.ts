import { FieldValue, IField } from '../models/schema';
import { IValidator } from './validator';

export default class PatternValidator implements IValidator {
  constructor(private name: string, private pattern: RegExp) {}

  public validate = (field: IField, value: FieldValue) => {
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

    return value.toString().match(this.pattern) !== null;
  };
}
