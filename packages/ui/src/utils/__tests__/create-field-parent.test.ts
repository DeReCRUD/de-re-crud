import {
  IField,
  ISchema,
  IStruct,
  IBlock,
  ILinkedStructField,
} from '@de-re-crud/core';
import createFieldParent from '../create-field-parent';

const structName = 'struct';
const defaultFieldName = 'test1';

const defaultField: IField = {
  hints: {
    readOnly: false,
    custom: {},
    width: 1,
  },
  initialValue: 'Test',
  keyField: false,
  label: { short: 'short', medium: 'medium', long: 'long' },
  name: defaultFieldName,
  required: false,
  struct: structName,
  type: 'text',
  unique: false,
  customValidators: [],
  defaultValidatorMessages: {},
};

const createSchema = (...fields: IField[]) => {
  const structs: IStruct[] = [];

  const fieldMap = new Map<string, Map<string, IField>>();

  fields.forEach((x) => {
    let struct = structs.find((s) => s.name === x.struct);

    if (!struct) {
      struct = { name: x.struct, fields: [], blocks: [] };
      structs.push(struct);
    }

    if (!fieldMap.has(x.struct)) {
      fieldMap.set(x.struct, new Map<string, IField>());
    }

    fieldMap.get(x.struct).set(x.name, x);
    struct.fields.push(x.name);
  });

  const schema: ISchema = {
    structs,
    fields: fieldMap,
    blocks: new Map<string, Map<string, IBlock>>(),
    customValidators: [],
    json: {
      structs: [],
    },
  };

  return schema;
};

describe('createFieldParent', () => {
  it('should create new field parent with initial values', () => {
    expect(createFieldParent(createSchema(defaultField), structName)).toEqual({
      [defaultFieldName]: 'Test',
    });
  });

  it('should return field parent with initial values', () => {
    expect(
      createFieldParent(createSchema(defaultField), structName, {
        test2: 'Test2',
      }),
    ).toEqual({
      [defaultFieldName]: 'Test',
      test2: 'Test2',
    });
  });

  it('should return field parent without initial values if already set in field parent', () => {
    expect(
      createFieldParent(createSchema(defaultField), structName, {
        [defaultFieldName]: 'Existing',
      }),
    ).toEqual({
      [defaultFieldName]: 'Existing',
    });
  });

  it('should return field parent without initial values if none are defined on fields', () => {
    const field = { ...defaultField };
    delete field.initialValue;

    expect(createFieldParent(createSchema(field), structName, {})).toEqual({});
  });

  it('should return field parent with nested initial values when field is linked struct', () => {
    const fields: IField[] = [
      { ...defaultField },
      {
        ...defaultField,
        name: 'test2',
        struct: 'struct2',
        initialValue: 'Test2',
      },
    ];

    const linkedStructField = fields[0] as ILinkedStructField;
    linkedStructField.type = 'linkedStruct';
    linkedStructField.reference = {
      block: 'block',
      struct: 'struct2',
    };

    expect(
      createFieldParent(createSchema(...fields), structName, { test1: [{}] }),
    ).toEqual({
      test1: [
        {
          test2: 'Test2',
        },
      ],
    });
  });
});
