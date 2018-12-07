import { IInternalStruct } from '../internal-schema';
import parseLabel from '../utils/schema-parser/parse-label';

export default function parseStruct(structJson: any): IInternalStruct {
  const result: IInternalStruct = {
    name: structJson.name,
    fields: [],
    blocks: [],
  };

  if (typeof structJson.label !== 'undefined') {
    result.label = parseLabel(structJson.label);
  }

  if (typeof structJson.collectionLabel !== 'undefined') {
    result.collectionLabel = parseLabel(structJson.collectionLabel);
  }

  if (Array.isArray(structJson.fields)) {
    structJson.fields.forEach((field) => {
      if (field.name) {
        result.fields.push(field.name);
      }
    });
  }

  if (Array.isArray(structJson.blocks)) {
    structJson.blocks.forEach((block) => {
      if (block.name) {
        result.blocks.push(block.name);
      }
    });
  }

  return result;
}
