import {
  DEFAULT_FIELD_WIDTH,
  IInternalField,
  IInternalIntegerField,
  IInternalLinkedStructField,
  IInternalListField,
  IInternalTextField,
  IInternalOptions,
} from '../../internal-schema';
import {
  FieldType,
  IField,
  IIntegerField,
  ILinkedStructField,
  IListField,
  ITextField,
} from '../..';
import parseField from '../parse-field';

const struct = 'TestStruct';

function createFieldTests(
  type: FieldType,
  extraInitailData = {},
  extraExpectedData = {},
  extraTests: (field: IField) => void = () => {},
) {
  describe(`when type is ${type}`, () => {
    const field: any = {
      struct,
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
      expect(parseField(struct, field)).toEqual({
        ...field,
        hints: {
          ...field.hints,
          readOnly: false,
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
        ...extraExpectedData,
      } as IInternalField);
    });

    it('should include help when specified', () => {
      expect(parseField(struct, { ...field, help: 'Field1Help' }).help).toBe(
        'Field1Help',
      );
    });

    it('should include initial value when specified', () => {
      expect(
        parseField(struct, { ...field, initialValue: 'Field1Value' })
          .initialValue,
      ).toBe('Field1Value');
    });

    it('should include missing value when specified', () => {
      expect(
        parseField(struct, {
          ...field,
          missingValue: 'Field1MissingValue',
        }).missingValue,
      ).toBe('Field1MissingValue');
    });

    it('should use placeholder instead of label when specified', () => {
      expect(
        parseField(struct, {
          ...field,
          placeholder: 'Field1Placeholder',
        }).placeholder,
      ).toBe('Field1Placeholder');
    });

    it('should override width hint when within threshold', () => {
      expect(
        parseField(struct, {
          ...field,
          hints: { ...field.hints, width: 6 },
        }).hints.width,
      ).toBe(6);
    });

    it('should use default width hint when under minumum threshold', () => {
      expect(
        parseField(struct, {
          ...field,
          hints: { ...field.hints, width: -6 },
        }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
    });

    it('should use default width hint when above maximum threshold', () => {
      expect(
        parseField(struct, {
          ...field,
          hints: { ...field.hints, width: 100 },
        }).hints.width,
      ).toBe(DEFAULT_FIELD_WIDTH);
    });

    it('should set readOnly hint when specified', () => {
      expect(
        parseField(struct, {
          ...field,
          hints: { ...field.hints, readOnly: true },
        }).hints.readOnly,
      ).toBe(true);
    });

    extraTests(field);
  });
}

describe('parseField', () => {
  createFieldTests('boolean');
  createFieldTests('date');
  createFieldTests('derived');
  createFieldTests('estimate');
  createFieldTests('foreignKey', {
    reference: { struct, labelField: 'field1' },
  });

  createFieldTests('integer', undefined, undefined, (field) => {
    it('should include min when specified', () => {
      const integerField = parseField(struct, {
        ...field,
        min: 5,
      } as IIntegerField) as IInternalIntegerField;

      expect(integerField.min).toBe(5);
    });

    it('should include max when specified', () => {
      const integerField = parseField(struct, {
        ...field,
        max: 100,
      } as IIntegerField) as IInternalIntegerField;

      expect(integerField.max).toBe(100);
    });
  });

  createFieldTests('keyword');

  createFieldTests(
    'linkedStruct',
    { reference: { struct } },
    { minInstances: 0, reference: { struct, block: 'default' } },
    (field) => {
      it('should include min instances when specified', () => {
        const linkedStructField = parseField(struct, {
          ...field,
          minInstances: 2,
        } as ILinkedStructField) as IInternalLinkedStructField;

        expect(linkedStructField.minInstances).toBe(2);
      });

      it('should include max instances when specified', () => {
        const linkedStructField = parseField(struct, {
          ...field,
          maxInstances: 10,
        } as ILinkedStructField) as IInternalLinkedStructField;

        expect(linkedStructField.maxInstances).toBe(10);
      });
    },
  );

  createFieldTests(
    'list',
    undefined,
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
    (field) => {
      it('should enable multi select when specified', () => {
        const listField = parseField(struct, {
          ...field,
          multiSelect: true,
        } as IListField) as IInternalListField;

        expect(listField.multiSelect).toBe(true);
      });

      it('should enable dynamic options when specified', () => {
        const listField = parseField(struct, {
          ...field,
          dynamicOptions: true,
        } as IListField) as IInternalListField;

        expect(listField.dynamicOptions).toBe(true);
      });

      it('should include options when specified', () => {
        const listField = parseField(struct, {
          ...field,
          options: [{ label: 'Label', value: 'Value' }],
        } as IListField) as IInternalListField;

        expect(listField.options).toEqual([
          {
            label: { short: 'Label', medium: 'Label', long: 'Label' },
            value: 'Value',
          },
        ] as IInternalOptions[]);
      });

      it('should layout as radio when specified', () => {
        const listField = parseField(struct, {
          ...field,
          hints: { ...field.hints, layout: 'radio' },
        } as IListField) as IInternalListField;

        expect(listField.hints.layout).toEqual('radio');
      });
    },
  );

  createFieldTests('money');
  createFieldTests('percent');

  createFieldTests(
    'text',
    undefined,
    {
      hints: {
        readOnly: false,
        custom: {},
        width: DEFAULT_FIELD_WIDTH,
        layout: 'input',
      },
    },
    (field) => {
      it('should include min length when specified', () => {
        const textField = parseField(struct, {
          ...field,
          minLength: 5,
        } as ITextField) as IInternalTextField;

        expect(textField.minLength).toBe(5);
      });

      it('should include max length when specified', () => {
        const textField = parseField(struct, {
          ...field,
          maxLength: 100,
        } as ITextField) as IInternalTextField;

        expect(textField.maxLength).toBe(100);
      });

      it('should layout as text area when specified', () => {
        const textField = parseField(struct, {
          ...field,
          hints: { ...field.hints, layout: 'textarea' },
        } as ITextField) as IInternalListField;

        expect(textField.hints.layout).toEqual('textarea');
      });
    },
  );
});
