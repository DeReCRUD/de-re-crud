import { ISchema, IStruct, IField, IBlock } from '.';

export default class InternalSchemaHelper {
  public static getStruct(schema: ISchema, structName: string): IStruct {
    return schema.structs.find((struct) => struct.name === structName);
  }

  public static getField(
    schema: ISchema,
    structName: string,
    fieldName: string,
  ): IField {
    return schema.fields.get(structName).get(fieldName);
  }

  public static getBlock(
    schema: ISchema,
    structName: string,
    blockName: string,
  ): IBlock {
    return schema.blocks.get(structName).get(blockName);
  }

  public static getKeyFields(schema: ISchema, structName: string): string[] {
    const struct = this.getStruct(schema, structName);

    return struct.fields.filter((x) => {
      const fields = schema.fields.get(structName);
      return fields.get(x).keyField;
    });
  }
}
