import {
  IInternalSchema,
  IInternalStruct,
  IInternalField,
  IInternalBlock,
  FieldMap,
  BlockMap,
} from '../internal-schema';
import Logger from '../logger';
import parseBlock from './parse-block';
import parseField from './parse-field';
import parseStruct from './parse-struct';

export default class SchemaParser {
  public static parse(schemaJson: any): IInternalSchema {
    const structs: IInternalStruct[] = [];
    const fields: Map<string, FieldMap> = new Map<string, FieldMap>();
    const blocks: Map<string, BlockMap> = new Map<string, BlockMap>();

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
              const field = parseField(struct.name, fieldJson);

              if (!fields.has(struct.name)) {
                fields.set(struct.name, new Map<string, IInternalField>());
              }

              fields.get(struct.name).set(field.name, field);
            });
          }

          if (Array.isArray(structJson.blocks)) {
            structJson.blocks.forEach((blockJson) => {
              const block = parseBlock(struct.name, blockJson);

              if (!blocks.has(struct.name)) {
                blocks.set(struct.name, new Map<string, IInternalBlock>());
              }

              blocks.get(struct.name).set(block.name, block);
            });
          }
        });
      }
    }

    return { structs, fields, blocks };
  }
}
