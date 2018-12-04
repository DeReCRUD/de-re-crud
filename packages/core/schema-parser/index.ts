import { ISchema } from '../models/schema';

export default class SchemaParser {
  public static parse(schemaJson: any): ISchema {
    return { raw: schemaJson, structs: [] };
  }
}
