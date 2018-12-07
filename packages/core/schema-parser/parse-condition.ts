import { BlockConditionFunc, FieldConditionFunc } from '../models/schema';

export const DEFAULT_CONDITION = () => true;

export default function parseCondition(
  conditionJson: string,
  blockCondition: boolean = false,
): BlockConditionFunc | FieldConditionFunc {
  let condition;

  if (conditionJson) {
    const conditionBody =
      conditionJson[0] === '{' ? conditionJson : `return ${conditionJson}`;

    const args = ['form', conditionBody];
    if (!blockCondition) {
      args.unshift('fieldParent');
    }

    condition = new Function(...args);
  } else {
    // tslint:disable-next-line:no-function-constructor-with-string-args
    condition = DEFAULT_CONDITION;
  }

  return condition;
}
