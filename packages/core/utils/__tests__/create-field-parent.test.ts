import { IField } from '../../models/schema';
import createFieldParent from '../create-field-parent';

const fields: IField[] = [
  {
    hints: {
      width: 1
    },
    initialValue: 'Test',
    keyField: false,
    label: { short: 'short', medium: 'medium', long: 'long' },
    name: 'test1',
    required: false,
    type: 'text',
    unique: false
  }
];

describe('createFieldParent', () => {
  it('should create new field parent with initial values', () => {
    expect(createFieldParent(fields)).toEqual({ test1: 'Test' });
  });

  it('should return field parent with initial values', () => {
    expect(createFieldParent(fields, { test2: 'Test2' })).toEqual({
      test1: 'Test',
      test2: 'Test2'
    });
  });

  it('should return field parent without initial values if already set in field parent', () => {
    expect(createFieldParent(fields, { test1: 'Existing' })).toEqual({
      test1: 'Existing'
    });
  });

  it('should return field parent without initial values if none are defined on fields', () => {
    const fieldsWithoutInitialValues = fields.concat();
    fieldsWithoutInitialValues[0] = { ...fields[0] };
    delete fieldsWithoutInitialValues[0].initialValue;

    expect(createFieldParent(fieldsWithoutInitialValues, {})).toEqual({});
  });
});
