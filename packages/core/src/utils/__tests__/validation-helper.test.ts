import { ISchemaJson, IFieldJson, ICustomValidator } from '../../schema/json';
import {
  ILinkedStructField,
  FieldValue,
  ITextField,
  IIntegerField,
  ICollectionReferences,
} from '../../schema';
import SchemaParser from '../../schema/parser';
import { validateField } from '../validation-helper';

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
          {
            type: 'boolean',
            name: 'deleted',
            label: 'Deleted',
            deletionField: true,
          },
        ],
        blocks: [],
      },
    ],
  };

  return SchemaParser.parse(schemaJson);
}

function runValidateField(
  field: Partial<IFieldJson> = {},
  value: FieldValue = undefined,
  customValidators: ICustomValidator[] = [],
  collectionReferences: ICollectionReferences = {},
) {
  return validateField(
    createSchema(field),
    'struct',
    'field',
    value,
    undefined,
    {},
    {},
    customValidators,
    collectionReferences,
  );
}

describe('validationHelper', () => {
  it('should return custom error if defined', () => {
    expect(
      runValidateField({
        label: 'Custom',
        required: true,
        defaultValidatorMessages: { required: '{label.short} is required.' },
      }),
    ).toEqual(['Custom is required.']);
  });

  it('should not interpolate error if no replacements found', () => {
    expect(
      runValidateField({
        required: true,
        defaultValidatorMessages: { required: '{unknown} is required' },
      }),
    ).toEqual(['{unknown} is required']);
  });

  it('should interpolate custom validator errors', () => {
    expect(
      runValidateField(
        {
          label: 'Custom',
          customValidators: ['numbersOnly'],
        },
        'A',
        [
          {
            name: 'numbersOnly',
            negate: false,
            message: '{label.short} can only contain numbers.',
            pattern: /[0-9]{1,}/g,
          },
        ],
      ),
    ).toEqual(['Custom can only contain numbers.']);
  });

  it('should return error if field is required and value is nil', () => {
    expect(runValidateField({ required: true })).toEqual([
      'This field is required.',
    ]);
  });

  it('should return not error if field is not required and value is nil', () => {
    expect(runValidateField({ required: false })).toEqual([]);
  });

  it('should return error if field is unique and new references result contains multiple instances', () => {
    expect(
      runValidateField(
        {
          unique: true,
        },
        'existing',
        [],
        {
          struct: () => {
            return [{ field: 'existing' }, { field: 'existing' }];
          },
        },
      ),
    ).toEqual(['This field must be unique.']);
  });

  it('should return not error if field is unique and new references result contain a single instance', () => {
    expect(
      runValidateField(
        {
          unique: true,
        },
        'existing',
        [],
        {
          struct: () => {
            return [{ field: 'existing' }];
          },
        },
      ),
    ).toEqual([]);
  });

  describe('when validating text fields', () => {
    it('should return error if value length is less than allowed min', () => {
      expect(
        runValidateField({ type: 'text', minLength: 5 } as ITextField, 'text'),
      ).toEqual(['This field must have at least 5 character(s).']);
    });

    it('should return error if value length is greater than allowed max', () => {
      expect(
        runValidateField({ type: 'text', maxLength: 1 } as ITextField, 'text'),
      ).toEqual(['This field can not have more than 1 character(s).']);
    });

    it('should not error if value length is between min and max', () => {
      expect(
        runValidateField(
          { type: 'text', minLength: 1, maxLength: 5 } as ITextField,
          'text',
        ),
      ).toEqual([]);
    });
  });

  describe('when validating integer fields', () => {
    it('should return error if value is less than allowed min', () => {
      expect(
        runValidateField({ type: 'integer', min: 5 } as IIntegerField, 4),
      ).toEqual(['This field must have a value of at least 5.']);
    });

    it('should return error if value length is greater than allowed max', () => {
      expect(
        runValidateField({ type: 'integer', max: 1 } as IIntegerField, 2),
      ).toEqual(['This field can not exceed the value of 1.']);
    });

    it('should not error if value is between min and max', () => {
      expect(
        runValidateField(
          { type: 'integer', min: 1, max: 5 } as IIntegerField,
          2,
        ),
      ).toEqual([]);
    });
  });

  describe('when validating keyword fields', () => {
    it('should return error if value contains spaces', () => {
      expect(
        runValidateField({ type: 'keyword' }, 'keyword with space'),
      ).toEqual(['This field can not contain any tabs or spaces.']);
    });

    it('should not return error if value contains no spaces', () => {
      expect(runValidateField({ type: 'keyword' }, 'keyword')).toEqual([]);
    });
  });

  describe('when validating linked struct fields', () => {
    const linkedStructField: Partial<ILinkedStructField> = {
      type: 'linkedStruct',
      reference: {
        block: 'block',
        struct: 'struct',
      },
    };

    it('should return no error if field is not required and value is nil', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            minInstances: 0,
          } as ILinkedStructField,
          undefined,
        ),
      ).toEqual([]);
    });

    it('should return no error if field is not required and value is empty', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            minInstances: 0,
          } as ILinkedStructField,
          [],
        ),
      ).toEqual([]);
    });

    it('should return error if field is required and value is empty', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: true,
            minInstances: 0,
          } as ILinkedStructField,
          [],
        ),
      ).toEqual(['This field must have at least 1 item(s).']);
    });

    it('should return error if field has minimum instance limit and value is empty', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            minInstances: 5,
          } as ILinkedStructField,
          [],
        ),
      ).toEqual(['This field must have at least 5 item(s).']);
    });

    it('should return error if field has more instances than the max allowed', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            maxInstances: 1,
          } as ILinkedStructField,
          [{ value: 'struct1' }, { value: 'struct2' }],
        ),
      ).toEqual(['This field can not have more than 1 item(s).']);
    });

    it('should not count deleted items in validation', () => {
      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: true,
            minInstances: 0,
          } as ILinkedStructField,
          [{ value: 'struct1', deleted: true }],
        ),
      ).toEqual(['This field must have at least 1 item(s).']);

      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            maxInstances: 1,
          } as ILinkedStructField,
          [{ value: 'struct1', deleted: true }, { value: 'struct2' }],
        ),
      ).toEqual([]);

      expect(
        runValidateField(
          {
            ...linkedStructField,
            required: false,
            minInstances: 1,
          } as ILinkedStructField,
          [{ value: 'struct1', deleted: true }],
        ),
      ).toEqual(['This field must have at least 1 item(s).']);
    });
  });
});
