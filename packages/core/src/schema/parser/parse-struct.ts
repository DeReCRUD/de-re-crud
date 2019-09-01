import { IInternalStruct } from '../internal';
import parseLabel from './parse-label';
import { IStruct } from '..';

export default function parseStruct(struct: IStruct): IInternalStruct {
  const result: IInternalStruct = {
    name: struct.name,
    fields: [],
    blocks: [],
  };

  if (typeof struct.label !== 'undefined') {
    result.label = parseLabel(struct.label);
  }

  if (typeof struct.collectionLabel !== 'undefined') {
    result.collectionLabel = parseLabel(struct.collectionLabel);
  }

  if (Array.isArray(struct.fields)) {
    struct.fields.forEach((field) => {
      if (field.name) {
        result.fields.push(field.name);
      }
    });
  }

  if (Array.isArray(struct.blocks)) {
    struct.blocks.forEach((block) => {
      if (block.name) {
        result.blocks.push(block.name);
      }
    });
  }

  return result;
}
