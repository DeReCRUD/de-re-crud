import { IInternalStruct } from '../../internal-schema';
import parseStruct from '../parse-struct';

describe('parseStruct', () => {
  let struct: IInternalStruct = null;
  let structJson: any = null;

  beforeEach(() => {
    structJson = {
      name: 'struct',
    };

    struct = {
      name: structJson.name,
      fields: [],
      blocks: [],
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseStruct(structJson)).toEqual(struct);
  });

  it('should return with fields when specified', () => {
    structJson.fields = [{ name: 'field1' }, { name: 'field2' }];

    expect(parseStruct(structJson)).toEqual({
      ...struct,
      fields: structJson.fields.map((field) => field.name),
    });
  });
});
