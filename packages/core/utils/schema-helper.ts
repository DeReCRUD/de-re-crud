import {
  IInternalSchema,
  IInternalStruct,
  IInternalField,
  IInternalBlock,
} from '../internal-schema';

export function getStruct(
  schema: IInternalSchema,
  structName: string,
): IInternalStruct {
  return schema.structs.find((struct) => struct.name === structName);
}

export function getField(
  schema: IInternalSchema,
  structName: string,
  fieldName: string,
): IInternalField {
  return schema.fields.get(structName).get(fieldName);
}

export function getBlock(
  schema: IInternalSchema,
  structName: string,
  blockName: string,
): IInternalBlock {
  return schema.blocks.get(structName).get(blockName);
}

export function getKeyFields(
  schema: IInternalSchema,
  structName: string,
): string[] {
  const struct = getStruct(schema, structName);

  return struct.fields.filter((x) => {
    const fields = schema.fields.get(structName);
    return fields.get(x).keyField;
  });
}
