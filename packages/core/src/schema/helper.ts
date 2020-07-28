import { ISchema, IStruct, IField, IBlock } from '.';

export default class InternalSchemaHelper {
  public static getStruct(schema: ISchema, structName: string): IStruct {
    const struct = schema.structs.find((x) => x.name === structName);
    return struct;
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
    const struct = InternalSchemaHelper.getStruct(schema, structName);

    return struct.fields.filter((x) => {
      const fields = schema.fields.get(structName);
      return fields.get(x).keyField;
    });
  }

  public static getDeletionFields(
    schema: ISchema,
    structName: string,
  ): string[] {
    const struct = InternalSchemaHelper.getStruct(schema, structName);

    return struct.fields.filter((x) => {
      const fields = schema.fields.get(structName);
      return fields.get(x).deletionField;
    });
  }

  public static getNonDeletedValues(
    schema: ISchema,
    struct: string,
    value: object[],
  ) {
    if (!Array.isArray(value)) {
      return value;
    }

    const fields = InternalSchemaHelper.getDeletionFields(schema, struct);
    if (!fields.length) {
      return value;
    }

    return value.filter((item) => {
      const allSet = fields.every((field) => !!item[field]);
      return !allSet;
    });
  }
}
