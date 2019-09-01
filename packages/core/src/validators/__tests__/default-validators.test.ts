import { IInternalField } from '../../schema/internal';
import { defaultValidatorFuncs } from '../default-validators';

describe('validators', () => {
  let field: IInternalField;

  beforeEach(() => {
    field = {
      keyField: false,
      struct: 'struct',
      name: 'field',
      label: {
        short: 'Field',
        medium: 'Field',
        long: 'Field',
      },
      type: 'text',
      required: false,
      unique: false,
      hints: {
        readOnly: false,
        width: 1,
        custom: {},
      },
      customValidators: [],
    };
  });

  describe('required validator', () => {
    beforeEach(() => {
      field.required = true;
    });

    it('should return true if field is linked struct', () => {
      field.type = 'linkedStruct';

      expect(defaultValidatorFuncs.required(field, null)).toBe(true);
    });

    it('should return true if field is not required', () => {
      field.required = false;

      expect(defaultValidatorFuncs.required(field, null)).toBe(true);
    });

    it('should return false if field is null', () => {
      expect(defaultValidatorFuncs.required(field, null)).toBe(false);
    });

    it('should return false if field is undefined', () => {
      expect(defaultValidatorFuncs.required(field, undefined)).toBe(false);
    });

    it('should return false if field is empty string', () => {
      expect(defaultValidatorFuncs.required(field, '')).toBe(false);
    });

    it('should return true if field is 0', () => {
      expect(defaultValidatorFuncs.required(field, 0)).toBe(true);
    });

    it('should return true if field is false', () => {
      expect(defaultValidatorFuncs.required(field, false)).toBe(true);
    });
  });
});
