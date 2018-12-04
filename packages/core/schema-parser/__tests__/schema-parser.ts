import SchemaParser from '../';

describe('SchemaParser', () => {
  it('should return default schema', () => {
    expect(SchemaParser.parse({})).toBe({
      raw: {},
      structs: [],
    });
  });
});
