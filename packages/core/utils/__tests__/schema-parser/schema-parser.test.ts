import { DEFAULT_FIELD_WIDTH, IField } from '../../../models/schema';
import { DEFAULT_CONDITION } from '../../../schema-parser/parse-condition';
import SchemaParser from '../../schema-parser';

describe('SchemaParser', () => {
  it('should return empty list of structs for empty value', () => {
    expect(SchemaParser.parse([])).toEqual({
      raw: [],
      customValidators: [],
      structs: [],
    });
  });

  it('should return empty list of structs for invalid value', () => {
    expect(SchemaParser.parse('schema')).toEqual({
      raw: 'schema',
      customValidators: [],
      structs: [],
    });
  });

  it('should return parsed result with defaults', () => {
    const field: IField = {
      hints: { width: DEFAULT_FIELD_WIDTH },
      keyField: false,
      label: { short: 'Field1', medium: 'Field1', long: 'Field1' },
      name: 'field1',
      placeholder: 'Field1',
      required: false,
      struct: 'struct1',
      type: 'text',
      unique: false,
      customValidators: [],
    };

    const raw = [
      {
        blocks: [{ name: 'block1', fields: [field.name] }],
        fields: [
          { type: field.type, name: field.name, label: field.label.short },
        ],
        name: 'struct1',
      },
    ];

    expect(SchemaParser.parse(raw)).toEqual({
      raw,
      customValidators: [],
      structs: [
        {
          blocks: [
            {
              condition: DEFAULT_CONDITION,
              fields: [
                {
                  condition: DEFAULT_CONDITION,
                  field,
                  hints: {},
                },
              ],
              hints: {
                layout: 'vertical',
              },
              items: [
                {
                  condition: DEFAULT_CONDITION,
                  field,
                  hints: {},
                },
              ],
              name: 'block1',
              struct: 'struct1',
            },
          ],
          fields: [field],
          name: 'struct1',
        },
      ],
    });
  });
});
