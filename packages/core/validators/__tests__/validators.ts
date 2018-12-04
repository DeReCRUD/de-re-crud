import { IField } from '../../models/schema';
import { defaultValidators } from '../../validators';

describe('defaultValidators', () => {
  let field: IField = null;

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
        width: 1,
      },
    };
  });

  describe('required validator', () => {
    beforeEach(() => {
      field.required = true;
    });

    it('should return true if field is linked struct', () => {
      field.type = 'linkedStruct';

      expect(defaultValidators.required(field, null)).toBe(true);
    });

    it('should return true if field is not required', () => {
      field.required = false;

      expect(defaultValidators.required(field, null)).toBe(true);
    });

    it('should return false if field is null', () => {
      expect(defaultValidators.required(field, null)).toBe(false);
    });

    it('should return false if field is undefined', () => {
      expect(defaultValidators.required(field, undefined)).toBe(false);
    });

    it('should return false if field is empty string', () => {
      expect(defaultValidators.required(field, '')).toBe(false);
    });

    it('should return true if field is 0', () => {
      expect(defaultValidators.required(field, 0)).toBe(true);
    });

    it('should return true if field is false', () => {
      expect(defaultValidators.required(field, false)).toBe(true);
    });
  });
});
