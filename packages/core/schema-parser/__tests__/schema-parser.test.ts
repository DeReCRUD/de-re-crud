import SchemaParser from '../';
import {
  IInternalStruct,
  IInternalSchema,
  FieldMap,
  BlockMap,
} from '../../internal-schema';

const mockStruct: IInternalStruct = {
  name: 'struct',
  fields: [],
  blocks: [],
};

jest.mock('../parse-struct', () => () => mockStruct);

describe('SchemaParser', () => {
  let schemaJson: any;

  beforeEach(() => {
    schemaJson = {
      structs: [{ ...mockStruct }],
    };
  });

  it('should parse schema', () => {
    expect(SchemaParser.parse(schemaJson)).toEqual({
      structs: [mockStruct],
      fields: new Map<string, FieldMap>(),
      blocks: new Map<string, BlockMap>(),
      customValidators: [],
      json: schemaJson,
    } as IInternalSchema);
  });
});
