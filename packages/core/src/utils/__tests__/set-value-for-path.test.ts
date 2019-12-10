import setValueForPath from '../set-value-for-path';

describe('setValueForPath', () => {
  it('should set obj value', () => {
    expect(setValueForPath({}, 'obj', { prop: 'value' })).toEqual({
      obj: { prop: 'value' },
    });
  });

  it('should set array value', () => {
    expect(setValueForPath({}, 'array', [{ obj: { prop: 'value' } }])).toEqual({
      array: [{ obj: { prop: 'value' } }],
    });
  });

  it('should set array child value', () => {
    expect(
      setValueForPath(
        {
          array: [
            {
              obj: {
                prop: 'oldValue',
              },
            },
          ],
        },
        'array.0.obj.prop',
        'newValue',
      ),
    ).toEqual({ array: [{ obj: { prop: 'newValue' } }] });
  });
});
