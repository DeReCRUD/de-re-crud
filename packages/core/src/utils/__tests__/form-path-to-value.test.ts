import getValueForPath from '../get-value-for-path';

describe('getValueForPath', () => {
  it('should return value parameter if object path is null', () => {
    const value = {
      parent: {
        child: {
          value: 1,
        },
      },
    };

    expect(getValueForPath(value)).toBe(value);
  });

  it('should return value from object path', () => {
    const value = {
      parent: {
        child: {
          value: 1,
        },
      },
    };

    expect(getValueForPath(value, 'parent.child.value')).toBe(1);
  });

  it('should return value from array path', () => {
    const value = {
      parent: {
        child: {
          array: [{ value: 1 }],
        },
      },
    };

    expect(getValueForPath(value, 'parent.child.array.0.value')).toBe(1);
  });
});
