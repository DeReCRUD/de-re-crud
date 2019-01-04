import {
  DEFAULT_FIELD_WIDTH,
  FieldType,
  IField,
  IIntegerField,
  ILinkedStructField,
  IListField,
  ITextField,
} from '../../../models/schema';
import parseField from '../../schema-parser/parse-field';

const structName = 'TestStruct';

function createField(type: FieldType) {
  return {
    struct: structName,
    name: 'field1',
    type,
    label: 'Field1',
    customValidators: [],
  };
}

// tslint:disable:no-empty
function createFieldTests(
  type: FieldType,
  extraDefaultData = {},
  extraTests: (fieldJson: any) => void = () => {},
) {
  describe(`when type is ${type}`, () => {
    const field = createField(type);

    it('should return defaults when no overrides specified', () => {
      expect(parseField(structName, field)).toEqual({
        ...field,
        hints: {
          width: DEFAULT_FIELD_WIDTH,
        },
        keyField: false,
        label: {
          long: field.label,
          medium: field.label,
          short: field.label,
        },
        placeholder: field.label,
        required: false,
        type,
        unique: false,
        ...extraDefaultData,
      } as IField);
    });

    it('should include help when specified', () => {
      expect(
        parseField(structName, { ...field, help: 'Field1Help' }).help,
      ).toBe('Field1Help');
    });

    it('should include initial value when specified', () => {
      expect(
        parseField(structName, { ...field, initialValue: 'Field1Value' })
          .initialValue,
      ).toBe('Field1Value');
    });

    it('should include missing value when specified', () => {
      expect(
        parseField(structName, { ...field, missingValue: 'Field1MissingValue' })
          .missingValue,
      ).toBe('Field1MissingValue');
    });

    it('should use placeholder instead of label when specified', () => {
      expect(
        parseField(structName, { ...field, placeholder: 'Field1Placeholder' })
          .placeholder,
      ).toBe('Field1Placeholder');
    });

    it('should override width hint when within threshold', () => {
      expect(
        parseField(structName, { ...field, hints: { width: 6 } }).hints.width,
      ).toBe(6);
    });

    it('should use default width hint when under minumum threshold', () => {
      expect(
        parseField(structName, { ...field, hints: { width: -6 } }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
    });

    it('should use default width hint when above maximum threshold', () => {
      expect(
        parseField(structName, { ...field, hints: { width: 100 } }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
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
      const integerField = parseField(structName, {
        ...field,
        min: 5,
      }) as IIntegerField;

      expect(integerField.min).toBe(5);
    });

    it('should include max when specified', () => {
      const integerField = parseField(structName, {
        ...field,
        max: 100,
      }) as IIntegerField;

      expect(integerField.max).toBe(100);
    });
  });

  createFieldTests('keyword');

  createFieldTests('linkedStruct', { minInstances: 0 }, (field) => {
    it('should include min instances when specified', () => {
      const linkedStructField = parseField(structName, {
        ...field,
        minInstances: 2,
      }) as ILinkedStructField;

      expect(linkedStructField.minInstances).toBe(2);
    });

    it('should include max instances when specified', () => {
      const linkedStructField = parseField(structName, {
        ...field,
        maxInstances: 10,
      }) as ILinkedStructField;

      expect(linkedStructField.maxInstances).toBe(10);
    });
  });

  createFieldTests(
    'list',
    {
      hints: { width: DEFAULT_FIELD_WIDTH, layout: 'select' },
      multiSelect: false,
      dynamicOptions: false,
      options: [],
    },
    (field) => {
      it('should enable multi select when specified', () => {
        const listField = parseField(structName, {
          ...field,
          multiSelect: true,
        }) as IListField;

        expect(listField.multiSelect).toBe(true);
      });

      it('should enable dynamic options when specified', () => {
        const listField = parseField(structName, {
          ...field,
          dynamicOptions: true,
        }) as IListField;

        expect(listField.dynamicOptions).toBe(true);
      });

      it('should include options when specified', () => {
        const listField = parseField(structName, {
          ...field,
          options: [{ label: 'Label', value: 'Value' }],
        }) as IListField;

        expect(listField.options).toEqual([
          {
            label: 'Label',
            value: 'Value',
          },
        ]);
      });

      it('should layout as radio when specified', () => {
        const listField = parseField(structName, {
          ...field,
          hints: { layout: 'radio' },
        }) as IListField;

        expect(listField.hints.layout).toEqual('radio');
      });
    },
  );

  createFieldTests('money');
  createFieldTests('percent');

  createFieldTests('text', null, (field) => {
    it('should include min length when specified', () => {
      const textField = parseField(structName, {
        ...field,
        minLength: 5,
      }) as ITextField;

      expect(textField.minLength).toBe(5);
    });

    it('should include max length when specified', () => {
      const textField = parseField(structName, {
        ...field,
        maxLength: 100,
      }) as ITextField;

      expect(textField.maxLength).toBe(100);
    });
  });
});
