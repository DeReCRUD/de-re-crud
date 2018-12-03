import { FieldValue, IField } from '../models/schema';
import { Validator } from '../models/validator';

export default class RequiredValidator extends Validator {
  public name: string = 'required';

  public validate(field: IField, value: FieldValue): boolean {
    if (field.type === 'linkedStruct' || !field.required) {
      return true;
    }

    return typeof value !== 'undefined' && value !== null && value !== '';
  }
}
