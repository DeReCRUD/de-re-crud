import defaults from '../defaults';

describe('defaults', () => {
  it('should assign defaults', () => {
    expect(
      defaults<{ a: number; b: number }>({ a: 1 }, { b: 2 }, { a: 3 }),
    ).toEqual({
      a: 1,
      b: 2,
    });
  });
});
