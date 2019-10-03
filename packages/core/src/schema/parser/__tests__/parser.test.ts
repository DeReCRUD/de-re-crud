import { ISchemaJson, IStructJson } from '../../json';
import { ISchema, BlockMap, FieldMap } from '../..';
import SchemaParser from '..';

const structJson: IStructJson = {
  name: 'struct',
  fields: [],
  blocks: [],
};

describe('SchemaParser', () => {
  let json: ISchemaJson;

  beforeEach(() => {
    json = {
      structs: [structJson],
    };
  });

  it('should parse schema', () => {
    expect(SchemaParser.parse(json)).toEqual({
      structs: [
        {
          name: structJson.name,
          fields: [],
          blocks: [],
        },
      ],
      fields: new Map<string, FieldMap>(),
      blocks: new Map<string, BlockMap>(),
      customValidators: [],
      json,
    } as ISchema);
  });
});
