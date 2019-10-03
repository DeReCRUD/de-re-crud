import Logger from '../../logger';
import { ISchema, IStruct, IField, IBlock, FieldMap, BlockMap } from '..';
import parseBlock from './parse-block';
import parseField from './parse-field';
import parseStruct from './parse-struct';
import { ISchemaJson, ICustomValidator } from '../json';

export default class SchemaParser {
  public static parse(schemaJson: ISchemaJson): ISchema {
    const structs: IStruct[] = [];
    const fields: Map<string, FieldMap> = new Map<string, FieldMap>();
    const blocks: Map<string, BlockMap> = new Map<string, BlockMap>();
    const customValidators: ICustomValidator[] = [];

    if (schemaJson) {
      const legacySchemaJson = schemaJson as any;
      if (Array.isArray(legacySchemaJson)) {
        schemaJson = {
          structs: legacySchemaJson,
        };

        Logger.deprecate(
          'Structs should live under the `structs` key in the schema instead of at the root',
        );
      }

      if (Array.isArray(schemaJson.structs)) {
        schemaJson.structs.forEach((rawStruct) => {
          const struct = parseStruct(rawStruct);
          structs.push(struct);

          if (Array.isArray(rawStruct.fields)) {
            rawStruct.fields.forEach((rawField) => {
              const field = parseField(
                struct.name,
                rawField,
                schemaJson.defaultValidatorMessages,
              );

              if (!fields.has(struct.name)) {
                fields.set(struct.name, new Map<string, IField>());
              }

              fields.get(struct.name)!.set(field.name, field);
            });
          }

          if (Array.isArray(rawStruct.blocks)) {
            rawStruct.blocks.forEach((blockJson) => {
              const block = parseBlock(struct.name, blockJson);

              if (!blocks.has(struct.name)) {
                blocks.set(struct.name, new Map<string, IBlock>());
              }

              blocks.get(struct.name)!.set(block.name, block);
            });
          }
        });
      }

      if (Array.isArray(schemaJson.customValidators)) {
        schemaJson.customValidators.forEach((validationJson) => {
          if (
            typeof validationJson.name === 'string' &&
            typeof validationJson.message === 'string' &&
            typeof validationJson.pattern === 'string'
          ) {
            customValidators.push({
              name: validationJson.name,
              message: validationJson.message,
              pattern: new RegExp(validationJson.pattern),
              negate: validationJson.negate === true,
            });
          }
        });
      }
    }

    return { structs, fields, blocks, customValidators, json: schemaJson };
  }
}
