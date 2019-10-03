import { ISchemaJson, IFieldJson } from '../../schema/json';
import { ILinkedStructField } from '../../schema';
import SchemaParser from '../../schema/parser';
import { validateLinkedStructField, validateField } from '../validation-helper';

function createSchema(field: Partial<IFieldJson> = {}) {
  const schemaJson: ISchemaJson = {
    structs: [
      {
        name: 'struct',
        label: 'Struct',
        collectionLabel: 'Structs',
        fields: [
          {
            type: 'text',
            name: 'field',
            label: 'field',
            ...(field as any),
          },
        ],
        blocks: [],
      },
    ],
  };

  return SchemaParser.parse(schemaJson);
}

function runValidateField(field: Partial<IFieldJson> = {}) {
  return validateField(
    createSchema(field),
    'struct',
    'field',
    '',
    '',
    {},
    {},
    [],
  );
}

describe('validationHelper', () => {
  it('should return error if field is required and value is nil', () => {
    expect(runValidateField({ required: true })).toEqual([
      'This field is required.',
    ]);
  });

  it('should return not error if field is not required and value is nil', () => {
    expect(runValidateField({ required: false })).toEqual([]);
  });

  describe('when validating linked struct fields', () => {
    it('should return no error if field is not required and value is nil', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, undefined),
      ).toEqual([]);
    });

    it('should return no error if field is not required and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual([]);
    });

    it('should return error if field is required and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: true,
        minInstances: 0,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual(['This field must have at least 1 item(s).']);
    });

    it('should return error if field has minimum instance limit and value is empty', () => {
      const field: Partial<ILinkedStructField> = {
        required: false,
        minInstances: 5,
      };

      expect(
        validateLinkedStructField(field as ILinkedStructField, []),
      ).toEqual(['This field must have at least 5 item(s).']);
    });
  });
});
