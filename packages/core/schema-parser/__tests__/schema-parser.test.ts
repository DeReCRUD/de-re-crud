import SchemaParser from '../';
import {
  IInternalStruct,
  IInternalSchema,
  IInternalField,
  IInternalBlock,
} from '../../internal-schema';

const mockStruct: IInternalStruct = {
  name: 'struct',
  fields: [],
  blocks: [],
};

jest.mock('../parse-struct', () => ({ default: () => mockStruct }));

describe('SchemaParser', () => {
  let schemaJson: any;

  beforeEach(() => {
    schemaJson = {
      structs: [{ ...mockStruct }],
    };
  });

  it('should parse schema', () => {
    expect(SchemaParser.parse(schemaJson)).toEqual({
      raw: schemaJson,
      structs: [mockStruct],
      fields: new Map<string, IInternalField>(),
      blocks: new Map<string, IInternalBlock>(),
    } as IInternalSchema);
  });
});
