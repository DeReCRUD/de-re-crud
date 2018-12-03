import { IField } from '../../models/schema';
import RequiredValidator from '../required-validator';

describe('RequiredValidator', () => {
  let sut: RequiredValidator = null;

  let field: IField = null;

  beforeEach(() => {
    sut = new RequiredValidator();
    field = {
      keyField: false,
      struct: 'struct',
      name: 'field',
      label: {
        short: 'Field',
        medium: 'Field',
        long: 'Field'
      },
      type: 'text',
      required: true,
      unique: false,
      hints: {
        width: 1
      }
    };
  });

  it('should return true if field is linked struct', () => {
    field.type = 'linkedStruct';

    expect(sut.validate(field, null)).toBe(true);
  });

  it('should return true if field is not required', () => {
    field.required = false;

    expect(sut.validate(field, null)).toBe(true);
  });

  it('should return false if field is null', () => {
    expect(sut.validate(field, null)).toBe(false);
  });

  it('should return false if field is undefined', () => {
    expect(sut.validate(field, undefined)).toBe(false);
  });

  it('should return false if field is empty string', () => {
    expect(sut.validate(field, '')).toBe(false);
  });

  it('should return true if field is 0', () => {
    expect(sut.validate(field, 0)).toBe(true);
  });

  it('should return true if field is false', () => {
    expect(sut.validate(field, false)).toBe(true);
  });
});
