import { DEFAULT_FIELD_WIDTH, IField } from '../../../models/schema';
import SchemaParser from '../../schema-parser';

describe('SchemaParser', () => {
  it('should return empty list of structs for empty value', () => {
    expect(SchemaParser.parse([])).toEqual([]);
  });

  it('should return empty list of structs for invalid value', () => {
    expect(SchemaParser.parse('schema')).toEqual([]);
  });

  it(`should return parsed result with defaults`, () => {
    const field: IField = {
      hints: { width: DEFAULT_FIELD_WIDTH },
      keyField: false,
      label: { short: 'Field1', medium: 'Field1', long: 'Field1' },
      name: 'field1',
      placeholder: 'Field1',
      required: false,
      struct: 'struct1',
      type: 'text',
      unique: false
    };

    expect(
      SchemaParser.parse([
        {
          blocks: [{ name: 'block1', fields: [field.name] }],
          fields: [
            { type: field.type, name: field.name, label: field.label.short }
          ],
          name: 'struct1'
        }
      ])
    ).toEqual([
      {
        blocks: [
          {
            condition: SchemaParser.DEFAULT_CONDITION,
            fields: [
              {
                condition: SchemaParser.DEFAULT_CONDITION,
                field,
                hints: {}
              }
            ],
            hints: {
              layout: 'vertical'
            },
            items: [
              {
                condition: SchemaParser.DEFAULT_CONDITION,
                field,
                hints: {}
              }
            ],
            name: 'block1',
            struct: 'struct1'
          }
        ],
        fields: [field],
        name: 'struct1'
      }
    ]);
  });
});
