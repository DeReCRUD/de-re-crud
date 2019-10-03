import { Condition, IConditionParams, ConditionFunc } from '../json';

export const DEFAULT_CONDITION = () => true;

function wrapCondition(args: any[]): ConditionFunc {
  // eslint-disable-next-line no-new-func
  const condition = new Function(...args);

  return (params: IConditionParams): boolean => {
    return condition(params.path, params.formValue, params.parentValue);
  };
}

export default function parseCondition(
  rawCondition?: string | Condition,
): ConditionFunc {
  let condition: ConditionFunc;

  if (typeof rawCondition === 'function') {
    condition = rawCondition as ConditionFunc;
  } else if (typeof rawCondition === 'string') {
    const conditionBody =
      rawCondition[0] === '{' ? rawCondition : `return ${rawCondition}`;

    const args = ['path', 'formValue', 'parentValue', conditionBody];
    condition = wrapCondition(args);
  } else {
    condition = DEFAULT_CONDITION;
  }

  return condition;
}
