import {
  IInternalBlock,
  IInternalStamp,
  IInternalBlockReference,
  IInternalFieldReference,
  IInternalLinkedStructFieldReference,
} from '../internal-schema';
import { BlockConditionFunc, DEFAULT_FIELD_WIDTH } from '../models/schema';
import parseLabel from '../utils/schema-parser/parse-label';
import parseCondition from './parse-condition';

export default function parseBlock(
  structName: string,
  blockJson: any,
): IInternalBlock {
  const result: IInternalBlock = {
    struct: structName,
    name: blockJson.name,
    condition: parseCondition(blockJson.condition, true) as BlockConditionFunc,
    fields: [],
    items: [],
    hints: {
      layout: 'vertical',
    },
  };

  if (typeof blockJson.label !== 'undefined') {
    result.label = parseLabel(blockJson.label);
  }

  if (typeof blockJson.hints !== 'undefined') {
    if (typeof blockJson.hints.layout !== 'undefined') {
      result.hints.layout = blockJson.hints.layout;
    }
  }

  if (Array.isArray(blockJson.fields)) {
    let blockInstance = 1;

    blockJson.fields.map((blockFieldJson) => {
      if (typeof blockFieldJson.stamp !== 'undefined') {
        const stamp: IInternalStamp = {
          blockInstance: blockInstance++,
          condition: parseCondition(blockFieldJson.condition),
          size: blockFieldJson.size || 3,
          text: blockJson.stamp,
        };

        result.items.push(stamp);
      } else if (typeof blockFieldJson.block !== 'undefined') {
        result.items.push({
          block: blockFieldJson.block,
        } as IInternalBlockReference);
      } else if (
        typeof blockFieldJson === 'string' ||
        typeof blockFieldJson.field !== 'undefined'
      ) {
        const isComplexObject = typeof blockFieldJson !== 'string';
        const fieldName = isComplexObject
          ? blockFieldJson.field
          : blockFieldJson;

        const fieldReference: IInternalFieldReference = {
          condition: parseCondition(blockFieldJson.condition),
          field: fieldName,
          hints: {},
        };

        if (typeof blockFieldJson.hints !== 'undefined') {
          if (
            typeof blockFieldJson.hints.width !== 'undefined' &&
            blockFieldJson.hints.width >= 1 &&
            blockFieldJson.hints.width <= DEFAULT_FIELD_WIDTH
          ) {
            fieldReference.hints.width = blockFieldJson.hints.width;
          }

          // TODO: Need a better way to determine if reference is a linked struct
          if (typeof blockFieldJson.hints.layout !== 'undefined') {
            const linkedStructFieldReference = fieldReference as IInternalLinkedStructFieldReference;
            linkedStructFieldReference.hints.layout =
              blockFieldJson.hints.layout;
          }

          if (typeof blockFieldJson.hints.block !== 'undefined') {
            const linkedStructFieldReference = fieldReference as IInternalLinkedStructFieldReference;
            linkedStructFieldReference.hints.block = blockFieldJson.hints.block;
          }
        }

        result.items.push(fieldReference);
        result.fields.push(fieldReference);
      }
    });
  }

  return result;
}
