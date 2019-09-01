import { IInternalStruct } from '../../internal-schema';
import parseStruct from '../parse-struct';
import { IStruct } from '../..';

describe('parseStruct', () => {
  let result: IInternalStruct;
  let struct: IStruct;

  beforeEach(() => {
    struct = {
      name: 'struct',
      fields: [],
      blocks: [],
    };

    result = {
      name: struct.name,
      fields: [],
      blocks: [],
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseStruct(struct)).toEqual(result);
  });

  it('should return with fields when specified', () => {
    struct.fields = [
      { type: 'text', name: 'field1', label: 'Field1' },
      { type: 'text', name: 'field2', label: 'Field2' },
    ];

    expect(parseStruct(struct)).toEqual({
      ...result,
      fields: struct.fields.map((field) => field.name),
    });
  });
});
