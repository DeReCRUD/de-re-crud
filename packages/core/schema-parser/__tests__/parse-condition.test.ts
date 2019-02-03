import { BlockConditionFunc, FieldConditionFunc } from '../../models/schema';
import parseCondition, { DEFAULT_CONDITION } from '../parse-condition';

describe('parseCondition', () => {
  it('should return default condition if none specified', () => {
    expect(parseCondition(undefined)).toEqual(DEFAULT_CONDITION);
  });

  it('should return block condition function if string condition is specified', () => {
    const condition = parseCondition(
      'form.name === "test"',
      true,
    ) as BlockConditionFunc;

    expect(condition({ name: 'test' })).toBe(true);
  });

  it('should return field condition function if string condition is specified', () => {
    const condition = parseCondition(
      'form.name === "test" && fieldParent.name === "test"',
    ) as FieldConditionFunc;

    expect(condition({ name: 'test' }, { name: 'test' })).toBe(true);
  });

  it('should not overwrite condition if already a function', () => {
    const mockCondition = jest.fn(() => true);
    const condition = parseCondition(mockCondition) as BlockConditionFunc;

    expect(condition({})).toBe(true);
  });
});
