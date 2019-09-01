import { IStructJson } from '../../json';
import { IStruct } from '../..';
import parseStruct from '../parse-struct';

describe('parseStruct', () => {
  let struct: IStruct;
  let json: IStructJson;

  beforeEach(() => {
    json = {
      name: 'struct',
      fields: [],
      blocks: [],
    };

    struct = {
      name: json.name,
      fields: [],
      blocks: [],
    };
  });

  it('should return defaults when no overrides specified', () => {
    expect(parseStruct(json)).toEqual(struct);
  });

  it('should return with fields when specified', () => {
    json.fields = [
      { type: 'text', name: 'field1', label: 'Field1' },
      { type: 'text', name: 'field2', label: 'Field2' },
    ];

    expect(parseStruct(json)).toEqual({
      ...struct,
      fields: json.fields.map((field) => field.name),
    });
  });
});
