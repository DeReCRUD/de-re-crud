import Logger from '../../logger';
import {
  DEFAULT_FIELD_WIDTH,
  IBlock,
  IStamp,
  IBlockReference,
  IFieldReference,
  ILinkedStructFieldReference,
} from '..';
import parseCondition from './parse-condition';
import parseLabel from './parse-label';
import {
  IBlockJson,
  IStampReferenceJson,
  IBlockReferenceJson,
  IFieldReferenceJson,
  ILinkedStructFieldReferenceHintsJson,
} from '../json';

export default function parseBlock(
  structName: string,
  blockJson: IBlockJson,
): IBlock {
  const legacyBlockJson = blockJson as any;
  if (Array.isArray(legacyBlockJson.fields)) {
    blockJson.references = legacyBlockJson.fields;

    Logger.deprecate('block.fields should moved to block.references');
  }

  const block: IBlock = {
    struct: structName,
    name: blockJson.name,
    condition: parseCondition(blockJson.condition),
    fields: [],
    references: [],
    hints: {
      layout: 'vertical',
      custom: {},
    },
  };

  if (typeof blockJson.label !== 'undefined') {
    block.label = parseLabel(blockJson.label);
  }

  if (typeof blockJson.hints !== 'undefined') {
    if (typeof blockJson.hints.layout !== 'undefined') {
      block.hints.layout = blockJson.hints.layout;
    }

    if (typeof blockJson.hints.custom !== 'undefined') {
      block.hints.custom = blockJson.hints.custom;
    }
  }

  if (Array.isArray(blockJson.references)) {
    let blockInstance = 1;

    blockJson.references.forEach((referenceJson) => {
      const stampReferenceJson = referenceJson as IStampReferenceJson;
      if (typeof stampReferenceJson.stamp !== 'undefined') {
        const stamp: IStamp = {
          blockInstance: blockInstance++,
          condition: parseCondition(stampReferenceJson.condition),
          size: stampReferenceJson.size || 3,
          text: stampReferenceJson.stamp,
          hints: {
            custom: {},
          },
        };

        if (typeof stampReferenceJson.hints !== 'undefined') {
          if (typeof stampReferenceJson.hints.custom !== 'undefined') {
            stamp.hints.custom = stampReferenceJson.hints.custom;
          }
        }

        block.references.push(stamp);
        return;
      }

      const blockReferenceJson = referenceJson as IBlockReferenceJson;
      if (typeof blockReferenceJson.block !== 'undefined') {
        block.references.push({
          block: blockReferenceJson.block,
        } as IBlockReference);

        return;
      }

      const fieldReferenceJson = referenceJson as IFieldReferenceJson;
      if (typeof fieldReferenceJson.field !== 'undefined') {
        const fieldReference: IFieldReference = {
          condition: parseCondition(fieldReferenceJson.condition),
          field: fieldReferenceJson.field,
          hints: {
            custom: {},
          },
        };

        if (typeof fieldReferenceJson.hints !== 'undefined') {
          if (
            typeof fieldReferenceJson.hints.width !== 'undefined' &&
            fieldReferenceJson.hints.width >= 1 &&
            fieldReferenceJson.hints.width <= DEFAULT_FIELD_WIDTH
          ) {
            fieldReference.hints.width = fieldReferenceJson.hints.width;
          }

          if (typeof fieldReferenceJson.hints !== 'undefined') {
            const linkedStructFieldReferenceHints = fieldReferenceJson.hints as ILinkedStructFieldReferenceHintsJson;

            if (typeof linkedStructFieldReferenceHints.layout !== 'undefined') {
              const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;
              linkedStructFieldReference.hints.layout =
                linkedStructFieldReferenceHints.layout;
            }

            if (typeof linkedStructFieldReferenceHints.block !== 'undefined') {
              const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;
              linkedStructFieldReference.hints.block =
                linkedStructFieldReferenceHints.block;
            }
          }

          if (typeof fieldReferenceJson.hints.custom !== 'undefined') {
            fieldReference.hints.custom = fieldReferenceJson.hints.custom;
          }
        }

        block.references.push(fieldReference);
        block.fields.push(fieldReference);
        return;
      }

      if (typeof referenceJson === 'string') {
        const strFieldReference: IFieldReference = {
          condition: parseCondition(undefined),
          field: referenceJson as string,
          hints: {
            custom: {},
          },
        };

        block.references.push(strFieldReference);
        block.fields.push(strFieldReference);
      }
    });
  }

  return block;
}
