import Logger from '../../logger';
import {
  IInternalSchema,
  IInternalStruct,
  IInternalField,
  IInternalBlock,
  FieldMap,
  BlockMap,
} from '../internal';
import parseBlock from './parse-block';
import parseField from './parse-field';
import parseStruct from './parse-struct';
import { ISchema, ICustomValidator } from '..';

export default class SchemaParser {
  public static parse(schema: ISchema): IInternalSchema {
    const structs: IInternalStruct[] = [];
    const fields: Map<string, FieldMap> = new Map<string, FieldMap>();
    const blocks: Map<string, BlockMap> = new Map<string, BlockMap>();
    const customValidators: ICustomValidator[] = [];

    if (schema) {
      const legacySchema = schema as any;
      if (Array.isArray(legacySchema)) {
        schema = {
          structs: legacySchema,
        };

        Logger.deprecate(
          'Structs should live under the `structs` key in the schema instead of at the root',
        );
      }

      if (Array.isArray(schema.structs)) {
        schema.structs.forEach((rawStruct) => {
          const struct = parseStruct(rawStruct);
          structs.push(struct);

          if (Array.isArray(rawStruct.fields)) {
            rawStruct.fields.forEach((rawField) => {
              const field = parseField(struct.name, rawField);

              if (!fields.has(struct.name)) {
                fields.set(struct.name, new Map<string, IInternalField>());
              }

              fields.get(struct.name)!.set(field.name, field);
            });
          }

          if (Array.isArray(rawStruct.blocks)) {
            rawStruct.blocks.forEach((rawBlock) => {
              const block = parseBlock(struct.name, rawBlock);

              if (!blocks.has(struct.name)) {
                blocks.set(struct.name, new Map<string, IInternalBlock>());
              }

              blocks.get(struct.name)!.set(block.name, block);
            });
          }
        });
      }

      if (Array.isArray(schema.customValidators)) {
        schema.customValidators.forEach((validator) => {
          if (
            typeof validator.name === 'string' &&
            typeof validator.message === 'string' &&
            typeof validator.pattern === 'string'
          ) {
            customValidators.push({
              name: validator.name,
              message: validator.message,
              pattern: new RegExp(validator.pattern),
              negate: validator.negate === true,
            });
          }
        });
      }
    }

    return { structs, fields, blocks, customValidators, raw: schema };
  }
}
