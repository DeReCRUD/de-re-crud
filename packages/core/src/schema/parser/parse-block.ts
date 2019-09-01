import Logger from '../../logger';
import {
  DEFAULT_FIELD_WIDTH,
  IInternalBlock,
  IInternalStamp,
  IInternalBlockReference,
  IInternalFieldReference,
  IInternalLinkedStructFieldReference,
} from '../internal';
import parseCondition from './parse-condition';
import parseLabel from './parse-label';
import {
  IBlock,
  IStampReference,
  IBlockReference,
  IFieldReference,
  ILinkedStructFieldReferenceHints,
} from '..';

export default function parseBlock(
  structName: string,
  block: IBlock,
): IInternalBlock {
  const legacyBlock = block as any;
  if (Array.isArray(legacyBlock.fields)) {
    block.references = legacyBlock.fields;

    Logger.deprecate('block.fields should moved to block.references');
  }

  const result: IInternalBlock = {
    struct: structName,
    name: block.name,
    condition: parseCondition(block.condition),
    fields: [],
    references: [],
    hints: {
      layout: 'vertical',
      custom: {},
    },
  };

  if (typeof block.label !== 'undefined') {
    result.label = parseLabel(block.label);
  }

  if (typeof block.hints !== 'undefined') {
    if (typeof block.hints.layout !== 'undefined') {
      result.hints.layout = block.hints.layout;
    }

    if (typeof block.hints.custom !== 'undefined') {
      result.hints.custom = block.hints.custom;
    }
  }

  if (Array.isArray(block.references)) {
    let blockInstance = 1;

    block.references.forEach((reference) => {
      const stampReference = reference as IStampReference;
      if (typeof stampReference.stamp !== 'undefined') {
        const stamp: IInternalStamp = {
          blockInstance: blockInstance++,
          condition: parseCondition(stampReference.condition),
          size: stampReference.size || 3,
          text: stampReference.stamp,
          hints: {
            custom: {},
          },
        };

        if (typeof stampReference.hints !== 'undefined') {
          if (typeof stampReference.hints.custom !== 'undefined') {
            stamp.hints.custom = stampReference.hints.custom;
          }
        }

        result.references.push(stamp);
        return;
      }

      const blockReference = reference as IBlockReference;
      if (typeof blockReference.block !== 'undefined') {
        result.references.push({
          block: blockReference.block,
        } as IInternalBlockReference);

        return;
      }

      const fieldReference = reference as IFieldReference;
      if (typeof fieldReference.field !== 'undefined') {
        const internalReference: IInternalFieldReference = {
          condition: parseCondition(fieldReference.condition),
          field: fieldReference.field,
          hints: {
            custom: {},
          },
        };

        if (typeof fieldReference.hints !== 'undefined') {
          if (
            typeof fieldReference.hints.width !== 'undefined' &&
            fieldReference.hints.width >= 1 &&
            fieldReference.hints.width <= DEFAULT_FIELD_WIDTH
          ) {
            internalReference.hints.width = fieldReference.hints.width;
          }

          if (typeof fieldReference.hints !== 'undefined') {
            const linkedStructFieldReferenceHints = fieldReference.hints as ILinkedStructFieldReferenceHints;

            if (typeof linkedStructFieldReferenceHints.layout !== 'undefined') {
              const linkedStructFieldReference = internalReference as IInternalLinkedStructFieldReference;
              linkedStructFieldReference.hints.layout =
                linkedStructFieldReferenceHints.layout;
            }

            if (typeof linkedStructFieldReferenceHints.block !== 'undefined') {
              const linkedStructFieldReference = internalReference as IInternalLinkedStructFieldReference;
              linkedStructFieldReference.hints.block =
                linkedStructFieldReferenceHints.block;
            }
          }

          if (typeof fieldReference.hints.custom !== 'undefined') {
            internalReference.hints.custom = fieldReference.hints.custom;
          }
        }

        result.references.push(internalReference);
        result.fields.push(internalReference);
        return;
      }

      if (typeof reference === 'string') {
        const strfieldReference: IInternalFieldReference = {
          condition: parseCondition(undefined),
          field: reference as string,
          hints: {
            custom: {},
          },
        };

        result.references.push(strfieldReference);
        result.fields.push(strfieldReference);
      }
    });
  }

  return result;
}
