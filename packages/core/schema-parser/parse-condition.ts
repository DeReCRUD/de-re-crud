import {
  BlockConditionFunc,
  FieldConditionFunc,
  ConditionFunc,
  IConditionParams,
} from '../models/schema';

export const DEFAULT_CONDITION = () => true;

function wrapCondition(args: any[], blockCondition: boolean = false) {
  // eslint-disable-next-line no-new-func
  const condition = new Function(...args);

  return (params: IConditionParams): boolean => {
    if (blockCondition) {
      const blockConditionFunc = condition as BlockConditionFunc;
      return blockConditionFunc(params.formValue);
    }

    const fieldConditionFunc = condition as FieldConditionFunc;
    return fieldConditionFunc(params.parentValue, params.formValue);
  };
}

export default function parseCondition(
  conditionJson: string | Function,
  blockCondition: boolean = false,
): ConditionFunc {
  let condition: ConditionFunc;

  if (typeof conditionJson === 'function') {
    condition = conditionJson as ConditionFunc;
  } else if (typeof conditionJson === 'string') {
    const conditionBody =
      conditionJson[0] === '{' ? conditionJson : `return ${conditionJson}`;

    const args = ['form', conditionBody];
    if (!blockCondition) {
      args.unshift('fieldParent');
    }

    condition = wrapCondition(args, blockCondition);
  } else {
    condition = DEFAULT_CONDITION;
  }

  return condition;
}
