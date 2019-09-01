import parseCondition, { DEFAULT_CONDITION } from '../parse-condition';
import { IConditionParams } from '../../json';

describe('parseCondition', () => {
  it('should return default condition if none specified', () => {
    expect(parseCondition(undefined)).toEqual(DEFAULT_CONDITION);
  });

  it('should allow string condition to specify formValue', () => {
    const condition = parseCondition('formValue.name === "test"');

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
      'formValue.items[0].name === "test" && parentValue.name === "test"',
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
