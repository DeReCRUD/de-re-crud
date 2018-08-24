import {
  DEFAULT_FIELD_WIDTH,
  FieldType,
  IField,
  IIntegerField,
  ILinkedStructField,
  IListField,
  ITextField
} from '../../../models/schema';
import parseField from '../../schema-parser/parse-field';

function createField(type: FieldType) {
  return { name: 'field1', type, label: 'Field1' };
}

// tslint:disable:no-empty
function createFieldTests(
  type: FieldType,
  extraDefaultData = {},
  extraTests: (fieldJson: any) => void = () => {}
) {
  describe(`when type is ${type}`, () => {
    const field = createField(type);

    it('should return defaults when no overrides specified', () => {
      expect(parseField(field)).toEqual({
        ...field,
        hints: {
          width: DEFAULT_FIELD_WIDTH
        },
        keyField: false,
        label: {
          long: field.label,
          medium: field.label,
          short: field.label
        },
        placeholder: field.label,
        required: false,
        type,
        unique: false,
        ...extraDefaultData
      } as IField);
    });

    it('should include help when specified', () => {
      expect(parseField({ ...field, help: 'Field1Help' }).help).toBe(
        'Field1Help'
      );
    });

    it('should include initial value when specified', () => {
      expect(
        parseField({ ...field, initialValue: 'Field1Value' }).initialValue
      ).toBe('Field1Value');
    });

    it('should include missing value when specified', () => {
      expect(
        parseField({ ...field, missingValue: 'Field1MissingValue' })
          .missingValue
      ).toBe('Field1MissingValue');
    });

    it('should use placeholder instead of label when specified', () => {
      expect(
        parseField({ ...field, placeholder: 'Field1Placeholder' }).placeholder
      ).toBe('Field1Placeholder');
    });

    it('should override width hint when within threshold', () => {
      expect(parseField({ ...field, hints: { width: 6 } }).hints.width).toBe(6);
    });

    it('should use default width hint when under minumum threshold', () => {
      expect(parseField({ ...field, hints: { width: -6 } }).hints.width).toBe(
        DEFAULT_FIELD_WIDTH
      );
    });

    it('should use default width hint when above maximum threshold', () => {
      expect(parseField({ ...field, hints: { width: 100 } }).hints.width).toBe(
        DEFAULT_FIELD_WIDTH
      );
    });

    extraTests(field);
  });
}

describe('parseField', () => {
  createFieldTests('boolean');
  createFieldTests('date');
  createFieldTests('derived');
  createFieldTests('estimate');
  createFieldTests('foreignKey');

  createFieldTests('integer', null, (field) => {
    it('should include min when specified', () => {
      const integerField = parseField({ ...field, min: 5 }) as IIntegerField;

      expect(integerField.min).toBe(5);
    });

    it('should include max when specified', () => {
      const integerField = parseField({ ...field, max: 100 }) as IIntegerField;

      expect(integerField.max).toBe(100);
    });
  });

  createFieldTests('keyword');

  createFieldTests('linkedStruct', null, (field) => {
    it('should include min instances when specified', () => {
      const linkedStructField = parseField({
        ...field,
        minInstances: 2
      }) as ILinkedStructField;

      expect(linkedStructField.minInstances).toBe(2);
    });

    it('should include max instances when specified', () => {
      const linkedStructField = parseField({
        ...field,
        maxInstances: 10
      }) as ILinkedStructField;

      expect(linkedStructField.maxInstances).toBe(10);
    });
  });

  createFieldTests('list', { options: [] }, (field) => {
    it('should include options when specified', () => {
      const listField = parseField({
        ...field,
        options: [{ label: 'Label', value: 'Value' }]
      }) as IListField;

      expect(listField.options).toEqual([
        {
          label: 'Label',
          value: 'Value'
        }
      ]);
    });
  });

  createFieldTests('money');
  createFieldTests('percent');

  createFieldTests('text', null, (field) => {
    it('should include min length when specified', () => {
      const textField = parseField({ ...field, minLength: 5 }) as ITextField;

      expect(textField.minLength).toBe(5);
    });

    it('should include max length when specified', () => {
      const textField = parseField({ ...field, maxLength: 100 }) as ITextField;

      expect(textField.maxLength).toBe(100);
    });
  });
});
