import { IField } from '../../models/schema';
import PatternValidator from '../pattern-validator';

describe('PattemValidator', () => {
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
      customValidators: ['testPattern'],
    };
  });

  it('should return true is null', () => {
    expect(
      new PatternValidator('testPattern', /[a-z]/).validate(field, null),
    ).toBe(true);
  });

  it('should return true is undefined', () => {
    expect(
      new PatternValidator('testPattern', /[a-z]/).validate(field, undefined),
    ).toBe(true);
  });

  it('should return false if value does not match pattern', () => {
    expect(
      new PatternValidator('testPattern', /[a-z]/).validate(field, 'A'),
    ).toBe(false);
  });

  it('should return true if value matches pattern', () => {
    expect(
      new PatternValidator('testPattern', /[a-z]/).validate(field, 'a'),
    ).toBe(true);
  });

  it('should return true if value matches string pattern', () => {
    expect(
      new PatternValidator('testPattern', new RegExp('[a-z]')).validate(
        field,
        'a',
      ),
    ).toBe(true);
  });

  it('should return false if field does not have validator', () => {
    expect(
      new PatternValidator('testPattern2', /[a-z]/).validate(field, 'a'),
    ).toBe(true);
  });
});
