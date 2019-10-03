import { IStruct } from '..';
import parseLabel from './parse-label';
import { IStructJson } from '../json';

export default function parseStruct(structJson: IStructJson): IStruct {
  const struct: IStruct = {
    name: structJson.name,
    fields: [],
    blocks: [],
  };

  if (typeof structJson.label !== 'undefined') {
    struct.label = parseLabel(structJson.label);
  }

  if (typeof structJson.collectionLabel !== 'undefined') {
    struct.collectionLabel = parseLabel(structJson.collectionLabel);
  }

  if (Array.isArray(structJson.fields)) {
    structJson.fields.forEach((field) => {
      if (field.name) {
        struct.fields.push(field.name);
      }
    });
  }

  if (Array.isArray(structJson.blocks)) {
    structJson.blocks.forEach((block) => {
      if (block.name) {
        struct.blocks.push(block.name);
      }
    });
  }

  return struct;
}
