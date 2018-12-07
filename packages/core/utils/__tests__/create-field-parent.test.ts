import { IField, ILinkedStructField } from '../../models/schema';
import createFieldParent from '../create-field-parent';

const fields: IField[] = [
  {
    hints: {
      width: 1,
    },
    initialValue: 'Test',
    keyField: false,
    label: { short: 'short', medium: 'medium', long: 'long' },
    name: 'test1',
    required: false,
    struct: 'struct',
    type: 'text',
    unique: false,
  },
];

describe('createFieldParent', () => {
  it('should create new field parent with initial values', () => {
    expect(createFieldParent(fields)).toEqual({ test1: 'Test' });
  });

  it('should return field parent with initial values', () => {
    expect(createFieldParent(fields, { test2: 'Test2' })).toEqual({
      test1: 'Test',
      test2: 'Test2',
    });
  });

  it('should return field parent without initial values if already set in field parent', () => {
    expect(createFieldParent(fields, { test1: 'Existing' })).toEqual({
      test1: 'Existing',
    });
  });

  it('should return field parent without initial values if none are defined on fields', () => {
    const fieldsWithoutInitialValues = fields.concat();
    fieldsWithoutInitialValues[0] = { ...fields[0] };
    delete fieldsWithoutInitialValues[0].initialValue;

    expect(createFieldParent(fieldsWithoutInitialValues, {})).toEqual({});
  });

  it('should return field parent with nested initial values when field is linked struct', () => {
    const fieldsWithLinkedStruct = fields.concat();
    fieldsWithLinkedStruct[0] = {
      ...fields[0],
      reference: {
        block: {},
        struct: {
          fields: [
            {
              initialValue: 'Test2',
              name: 'test2',
            },
          ],
        },
      },
      type: 'linkedStruct',
    } as ILinkedStructField;

    expect(createFieldParent(fieldsWithLinkedStruct, { test1: [{}] })).toEqual({
      test1: [
        {
          test2: 'Test2',
        },
      ],
    });
  });
});
