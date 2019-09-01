import { IInternalSchema, BlockMap, FieldMap } from '../../internal';
import SchemaParser from '..';
import { ISchema, IStruct } from '../..';

const struct: IStruct = {
  name: 'struct',
  fields: [],
  blocks: [],
};

describe('SchemaParser', () => {
  let schema: ISchema;

  beforeEach(() => {
    schema = {
      structs: [struct],
    };
  });

  it('should parse schema', () => {
    expect(SchemaParser.parse(schema)).toEqual({
      structs: [
        {
          name: struct.name,
          fields: [],
          blocks: [],
        },
      ],
      fields: new Map<string, FieldMap>(),
      blocks: new Map<string, BlockMap>(),
      customValidators: [],
      raw: schema,
    } as IInternalSchema);
  });
});
