import {
  IInternalSchema,
  IInternalStruct,
  IInternalField,
  IInternalBlock,
} from '../internal-schema';
import parseStruct from './parse-struct';
import Logger from '../logger';

export default class SchemaParser {
  public static parse(schemaJson: any): IInternalSchema {
    const structs: IInternalStruct[] = [];
    const fields: Map<string, IInternalField> = new Map<
      string,
      IInternalField
    >();

    const blocks: Map<string, IInternalBlock> = new Map<
      string,
      IInternalBlock
    >();

    if (schemaJson) {
      if (Array.isArray(schemaJson)) {
        schemaJson = {
          structs: schemaJson,
        };

        Logger.warning(
          // tslint:disable-next-line:max-line-length
          'WARNING: Structs should live under the `structs` key in the schema instead of at the root. Support for this will be removed in the future',
        );
      }

      if (Array.isArray(schemaJson.structs)) {
        schemaJson.structs.forEach((structJson) => {
          const struct = parseStruct(structJson);
          structs.push(struct);

          if (Array.isArray(structJson.fields)) {
            structJson.fields.forEach((fieldJson) => {
              fields.set(struct.name, fieldJson);
            });
          }

          if (Array.isArray(structJson.blocks)) {
            structJson.blocks.forEach((blockJson) => {
              blocks.set(struct.name, blockJson);
            });
          }
        });
      }
    }

    return { raw: schemaJson, structs, fields, blocks };
  }
}
