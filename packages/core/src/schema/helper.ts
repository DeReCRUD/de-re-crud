import {
  IInternalSchema,
  IInternalStruct,
  IInternalField,
  IInternalBlock,
} from './internal';

export default class InternalSchemaHelper {
  public static getStruct(
    schema: IInternalSchema,
    structName: string,
  ): IInternalStruct {
    return schema.structs.find((struct) => struct.name === structName);
  }

  public static getField(
    schema: IInternalSchema,
    structName: string,
    fieldName: string,
  ): IInternalField {
    return schema.fields.get(structName).get(fieldName);
  }

  public static getBlock(
    schema: IInternalSchema,
    structName: string,
    blockName: string,
  ): IInternalBlock {
    return schema.blocks.get(structName).get(blockName);
  }

  public static getKeyFields(
    schema: IInternalSchema,
    structName: string,
  ): string[] {
    const struct = this.getStruct(schema, structName);

    return struct.fields.filter((x) => {
      const fields = schema.fields.get(structName);
      return fields.get(x).keyField;
    });
  }
}
