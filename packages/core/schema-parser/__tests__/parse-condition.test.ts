import { IConditionParams } from '../../models/schema';
import parseCondition, { DEFAULT_CONDITION } from '../parse-condition';

describe('parseCondition', () => {
  it('should return default condition if none specified', () => {
    expect(parseCondition(undefined)).toEqual(DEFAULT_CONDITION);
  });

  it('should return block condition function if string condition is specified', () => {
    const condition = parseCondition('form.name === "test"', true);

    expect(
      condition({
        path: 'name',
        parentValue: { name: 'test' },
        formValue: { name: 'test' },
      }),
    ).toBe(true);
  });

  it('should return field condition function if string condition is specified', () => {
    const condition = parseCondition(
      'form.items[0].name === "test" && fieldParent.name === "test"',
    );

    expect(
      condition({
        path: 'name',
        parentValue: { name: 'test' },
        formValue: { items: [{ name: 'test' }] },
      }),
    ).toBe(true);
  });

  it('should not overwrite condition if already a function', () => {
    const mockCondition = jest.fn(
      (params: IConditionParams) => params.path === 'name',
    );

    const condition = parseCondition(mockCondition);

    expect(
      condition({
        path: 'name',
        parentValue: { name: 'test' },
        formValue: { items: [{ name: 'test' }] },
      }),
    ).toBe(true);
  });
});
