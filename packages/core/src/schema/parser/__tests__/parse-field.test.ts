import {
  FieldType,
  IFieldJson,
  IIntegerFieldJson,
  ILinkedStructFieldJson,
  IListFieldJson,
  ITextFieldJson,
} from '../../json';
import {
  DEFAULT_FIELD_WIDTH,
  IField,
  IIntegerField,
  ILinkedStructField,
  IListField,
  ITextField,
  IOptions,
} from '../..';

import parseField from '../parse-field';

const struct = 'TestStruct';

function createFieldTests(
  type: FieldType,
  extraInitailData = {},
  extraExpectedData = {},
  extraTests: (json: IFieldJson) => void = () => {},
) {
  describe(`when type is ${type}`, () => {
    const field: any = {
      struct,
      name: 'field1',
      type,
      label: 'Field1',
      customValidators: [],
      defaultValidatorMessages: {},
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
      } as IField);
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

    it('should set default validation message when specified on field', () => {
      expect(
        parseField(struct, {
          ...field,
          defaultValidatorMessages: {
            keyword: 'Keyword Error',
          },
        }).defaultValidatorMessages.keyword,
      ).toBe('Keyword Error');
    });

    it('should set default validation message when specified globally', () => {
      expect(
        parseField(struct, field, { keyword: 'Keyword Error' })
          .defaultValidatorMessages.keyword,
      ).toBe('Keyword Error');
    });

    it('should set default validation message when specified on field and globally', () => {
      expect(
        parseField(
          struct,
          {
            ...field,
            defaultValidatorMessages: {
              keyword: 'Keyword Error',
            },
          },
          { keyword: 'Global Keyword Error' },
        ).defaultValidatorMessages.keyword,
      ).toBe('Keyword Error');
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
      } as IIntegerFieldJson) as IIntegerField;

      expect(integerField.min).toBe(5);
    });

    it('should include max when specified', () => {
      const integerField = parseField(struct, {
        ...field,
        max: 100,
      } as IIntegerFieldJson) as IIntegerField;

      expect(integerField.max).toBe(100);
    });
  });

  createFieldTests('keyword');

  createFieldTests(
    'linkedStruct',
    { reference: { struct } },
    { minInstances: 0, reference: { struct, block: 'default' } },
    (json) => {
      it('should include min instances when specified', () => {
        const linkedStructField = parseField(struct, {
          ...json,
          minInstances: 2,
        } as ILinkedStructFieldJson) as ILinkedStructField;

        expect(linkedStructField.minInstances).toBe(2);
      });

      it('should include max instances when specified', () => {
        const linkedStructField = parseField(struct, {
          ...json,
          maxInstances: 10,
        } as ILinkedStructFieldJson) as ILinkedStructField;

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
    (json) => {
      it('should enable multi select when specified', () => {
        const listField = parseField(struct, {
          ...json,
          multiSelect: true,
        } as IListFieldJson) as IListField;

        expect(listField.multiSelect).toBe(true);
      });

      it('should enable dynamic options when specified', () => {
        const listField = parseField(struct, {
          ...json,
          dynamicOptions: true,
        } as IListFieldJson) as IListField;

        expect(listField.dynamicOptions).toBe(true);
      });

      it('should include options when specified', () => {
        const listField = parseField(struct, {
          ...json,
          options: [{ label: 'Label', value: 'Value' }],
        } as IListFieldJson) as IListField;

        expect(listField.options).toEqual([
          {
            label: { short: 'Label', medium: 'Label', long: 'Label' },
            value: 'Value',
          },
        ] as IOptions[]);
      });

      it('should layout as radio when specified', () => {
        const listField = parseField(struct, {
          ...json,
          hints: { ...json.hints, layout: 'radio' },
        } as IListFieldJson) as IListField;

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
    (json) => {
      it('should include min length when specified', () => {
        const textField = parseField(struct, {
          ...json,
          minLength: 5,
        } as ITextFieldJson) as ITextField;

        expect(textField.minLength).toBe(5);
      });

      it('should include max length when specified', () => {
        const textField = parseField(struct, {
          ...json,
          maxLength: 100,
        } as ITextFieldJson) as ITextField;

        expect(textField.maxLength).toBe(100);
      });

      it('should layout as text area when specified', () => {
        const textField = parseField(struct, {
          ...json,
          hints: { ...json.hints, layout: 'textarea' },
        } as ITextFieldJson) as IListField;

        expect(textField.hints.layout).toEqual('textarea');
      });
    },
  );
});
