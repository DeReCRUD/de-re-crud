import {
  IInternalField,
  IInternalIntegerField,
  IInternalLinkedStructField,
  IInternalListField,
  IInternalTextField,
} from '../../internal-schema';
import { FieldType, DEFAULT_FIELD_WIDTH } from '../../models/schema';
import parseField from '../parse-field';

const structName = 'TestStruct';

// tslint:disable:no-empty
function createFieldTests(
  type: FieldType,
  extraInitailData = {},
  extraExpectedData = {},
  extraTests: (fieldJson: any) => void = () => {},
) {
  describe(`when type is ${type}`, () => {
    const fieldJson = {
      struct: structName,
      name: 'field1',
      type,
      label: 'Field1',
      customValidators: [],
      hints: {
        custom: {},
      },
      ...extraInitailData,
    };

    it('should return defaults when no overrides specified', () => {
      expect(parseField(structName, fieldJson)).toEqual({
        ...fieldJson,
        hints: {
          ...fieldJson.hints,
          readOnly: false,
          width: DEFAULT_FIELD_WIDTH,
        },
        keyField: false,
        label: {
          long: fieldJson.label,
          medium: fieldJson.label,
          short: fieldJson.label,
        },
        placeholder: fieldJson.label,
        required: false,
        type,
        unique: false,
        ...extraExpectedData,
      } as IInternalField);
    });

    it('should include help when specified', () => {
      expect(
        parseField(structName, { ...fieldJson, help: 'Field1Help' }).help,
      ).toBe('Field1Help');
    });

    it('should include initial value when specified', () => {
      expect(
        parseField(structName, { ...fieldJson, initialValue: 'Field1Value' })
          .initialValue,
      ).toBe('Field1Value');
    });

    it('should include missing value when specified', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          missingValue: 'Field1MissingValue',
        }).missingValue,
      ).toBe('Field1MissingValue');
    });

    it('should use placeholder instead of label when specified', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          placeholder: 'Field1Placeholder',
        }).placeholder,
      ).toBe('Field1Placeholder');
    });

    it('should override width hint when within threshold', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, width: 6 },
        }).hints.width,
      ).toBe(6);
    });

    it('should use default width hint when under minumum threshold', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, width: -6 },
        }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
    });

    it('should use default width hint when above maximum threshold', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, width: 100 },
        }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
    });

    it('should set readOnly hint when specified', () => {
      expect(
        parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, readOnly: true },
        }).hints.readOnly,
      ).toBe(true);
    });

    extraTests(fieldJson);
  });
}

describe('parseField', () => {
  createFieldTests('boolean');
  createFieldTests('date');
  createFieldTests('derived');
  createFieldTests('estimate');
  createFieldTests('foreignKey', {
    reference: { struct: structName, labelField: 'field1' },
  });

  createFieldTests('integer', null, null, (field) => {
    it('should include min when specified', () => {
      const integerField = parseField(structName, {
        ...field,
        min: 5,
      }) as IInternalIntegerField;

      expect(integerField.min).toBe(5);
    });

    it('should include max when specified', () => {
      const integerField = parseField(structName, {
        ...field,
        max: 100,
      }) as IInternalIntegerField;

      expect(integerField.max).toBe(100);
    });
  });

  createFieldTests('keyword');

  createFieldTests(
    'linkedStruct',
    { reference: { struct: structName } },
    { minInstances: 0, reference: { struct: structName, block: 'default' } },
    (fieldJson) => {
      it('should include min instances when specified', () => {
        const linkedStructField = parseField(structName, {
          ...fieldJson,
          minInstances: 2,
        }) as IInternalLinkedStructField;

        expect(linkedStructField.minInstances).toBe(2);
      });

      it('should include max instances when specified', () => {
        const linkedStructField = parseField(structName, {
          ...fieldJson,
          maxInstances: 10,
        }) as IInternalLinkedStructField;

        expect(linkedStructField.maxInstances).toBe(10);
      });
    },
  );

  createFieldTests(
    'list',
    null,
    {
      hints: {
        readOnly: false,
        custom: {},
        width: DEFAULT_FIELD_WIDTH,
        layout: 'select',
      },
      multiSelect: false,
      dynamicOptions: false,
      options: [],
    },
    (fieldJson) => {
      it('should enable multi select when specified', () => {
        const listField = parseField(structName, {
          ...fieldJson,
          multiSelect: true,
        }) as IInternalListField;

        expect(listField.multiSelect).toBe(true);
      });

      it('should enable dynamic options when specified', () => {
        const listField = parseField(structName, {
          ...fieldJson,
          dynamicOptions: true,
        }) as IInternalListField;

        expect(listField.dynamicOptions).toBe(true);
      });

      it('should include options when specified', () => {
        const listField = parseField(structName, {
          ...fieldJson,
          options: [{ label: 'Label', value: 'Value' }],
        }) as IInternalListField;

        expect(listField.options).toEqual([
          {
            label: 'Label',
            value: 'Value',
          },
        ]);
      });

      it('should layout as radio when specified', () => {
        const listField = parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, layout: 'radio' },
        }) as IInternalListField;

        expect(listField.hints.layout).toEqual('radio');
      });
    },
  );

  createFieldTests('money');
  createFieldTests('percent');

  createFieldTests(
    'text',
    null,
    {
      hints: {
        readOnly: false,
        custom: {},
        width: DEFAULT_FIELD_WIDTH,
        layout: 'text',
      },
    },
    (fieldJson) => {
      it('should include min length when specified', () => {
        const textField = parseField(structName, {
          ...fieldJson,
          minLength: 5,
        }) as IInternalTextField;

        expect(textField.minLength).toBe(5);
      });

      it('should include max length when specified', () => {
        const textField = parseField(structName, {
          ...fieldJson,
          maxLength: 100,
        }) as IInternalTextField;

        expect(textField.maxLength).toBe(100);
      });

      it('should layout as text area when specified', () => {
        const textField = parseField(structName, {
          ...fieldJson,
          hints: { ...fieldJson.hints, layout: 'textArea' },
        }) as IInternalListField;

        expect(textField.hints.layout).toEqual('textArea');
      });
    },
  );
});
