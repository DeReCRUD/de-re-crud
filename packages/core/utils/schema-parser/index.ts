import Logger from '../../logger';
import {
  BlockConditionFunc,
  DEFAULT_FIELD_WIDTH,
  FieldConditionFunc,
  IBlock,
  IField,
  IFieldReference,
  IForeignKeyField,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IReferenceField,
  ISchema,
  IStamp,
  IStruct
} from '../../models/schema';
import { Validator } from '../../models/validator';
import RequiredValidator from '../../validators/required-validator';
import validatorMessages from '../../validators/validator-messages';
import parseField from './parse-field';
import parseLabel from './parse-label';

interface ISchemaMap<T> {
  [key: string]: { parsed: T; json: any };
}

export default class SchemaParser {
  public static readonly DEFAULT_VALIDATORS: Validator[] = [
    new RequiredValidator()
  ];

  public static readonly DEFAULT_VALIDATOR_MESSAGES = validatorMessages;

  public static readonly DEFAULT_CONDITION = () => true;

  public static parse(schemaJson: any): ISchema {
    let structsJson: any;

    if (Array.isArray(schemaJson)) {
      Logger.warning(
        'WARNING: Structs should live under the `structs` key in the schema instead of at the root. Support for this will be removed in the future'
      );
      structsJson = schemaJson;
    } else if (Array.isArray(schemaJson.structs)) {
      structsJson = schemaJson.structs;
    } else {
      return {
        raw: schemaJson,
        structs: [],
        validators: [],
        validatorMessages: {}
      };
    }

    const structMap: ISchemaMap<IStruct> = {};

    const structFieldMap: { [structName: string]: ISchemaMap<IField> } = {};
    const structBlockMap: { [structName: string]: ISchemaMap<IBlock> } = {};

    for (const structJson of structsJson) {
      const fieldMap: ISchemaMap<IField> = {};
      const blockMap: ISchemaMap<IBlock> = {};

      structMap[structJson.name] = {
        json: structJson,
        parsed: this.parseStruct(structJson)
      };

      if (Array.isArray(structJson.fields)) {
        for (const fieldJson of structJson.fields) {
          fieldMap[fieldJson.name] = {
            json: fieldJson,
            parsed: parseField(structJson.name, fieldJson)
          };
        }
      }

      structFieldMap[structJson.name] = fieldMap;

      if (Array.isArray(structJson.blocks)) {
        for (const blockJson of structJson.blocks) {
          blockMap[blockJson.name] = {
            json: blockJson,
            parsed: this.parseBlock(structJson.name, blockJson)
          };
        }
      }

      structBlockMap[structJson.name] = blockMap;
    }

    Object.keys(structFieldMap).forEach((structName) => {
      Object.keys(structFieldMap[structName]).forEach((fieldName) => {
        const value = structFieldMap[structName][fieldName];
        const field = value.parsed;
        const json = value.json;

        switch (field.type) {
          case 'linkedStruct':
          case 'foreignKey': {
            const referenceField = field as IReferenceField;
            const { reference } = json;

            referenceField.reference = {
              block:
                structBlockMap[reference.struct][reference.block || 'default']
                  .parsed,
              struct: structMap[reference.struct].parsed
            };

            if (field.type === 'foreignKey') {
              const foreignKeyField = referenceField as IForeignKeyField;
              foreignKeyField.reference.labelField =
                structFieldMap[reference.struct][reference.labelField].parsed;
            }
            break;
          }
        }
      });
    });

    Object.keys(structBlockMap).forEach((structName) => {
      Object.keys(structBlockMap[structName]).forEach((blockName) => {
        const value = structBlockMap[structName][blockName];
        const block = value.parsed;
        const json = value.json;

        let blockInstance = 1;

        json.fields.forEach((blockField) => {
          if (blockField.stamp) {
            const stamp: IStamp = {
              blockInstance: blockInstance++,
              condition: this.parseCondition(blockField.condition),
              size: blockField.size || 3,
              text: blockField.stamp
            };

            block.items.push(stamp);
          } else if (blockField.block) {
            const nestedBlockValue =
              structBlockMap[structName][blockField.block];
            const nestedBlock = nestedBlockValue.parsed;

            block.items.push({ block: nestedBlock });
          } else if (blockField.field || typeof blockField === 'string') {
            const fieldName = blockField.field || blockField;
            const fieldValue = structFieldMap[structName][fieldName];
            const field = fieldValue.parsed;

            const fieldReference: IFieldReference = {
              condition: this.parseCondition(blockField.condition),
              field,
              hints: {}
            };

            if (blockField.hints) {
              if (
                typeof blockField.hints.width !== 'undefined' &&
                blockField.hints.width >= 1 &&
                blockField.hints.width <= DEFAULT_FIELD_WIDTH
              ) {
                fieldReference.hints.width = blockField.hints.width;
              }
            }

            switch (field.type) {
              case 'linkedStruct': {
                const linkedStructField = field as ILinkedStructField;
                const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;

                const { hints } = blockField;

                linkedStructFieldReference.hints = {
                  layout: (hints && hints.layout) || 'inline'
                };

                linkedStructFieldReference.hints.block =
                  structBlockMap[linkedStructField.reference.struct.name][
                    (hints && hints.block) || 'default'
                  ].parsed;

                break;
              }
            }

            block.items.push(fieldReference);
            block.fields.push(fieldReference);
          }
        });
      });
    });

    const structs = Object.keys(structMap).map((structName) => {
      const struct = structMap[structName].parsed;
      const json = structMap[structName].json;

      if (Array.isArray(json.fields)) {
        json.fields.forEach((field) => {
          struct.fields.push(structFieldMap[structName][field.name].parsed);
        });
      }

      if (Array.isArray(json.blocks)) {
        json.blocks.forEach((block) => {
          struct.blocks.push(structBlockMap[structName][block.name].parsed);
        });
      }

      return struct;
    });

    return {
      raw: schemaJson,
      structs,
      validators: this.DEFAULT_VALIDATORS,
      validatorMessages: this.DEFAULT_VALIDATOR_MESSAGES
    };
  }

  private static parseStruct(structJson: any): IStruct {
    const result: IStruct = {
      blocks: [],
      fields: [],
      name: structJson.name
    };

    if (structJson.label) {
      result.label = parseLabel(structJson.label);
    }

    if (structJson.collectionLabel) {
      result.collectionLabel = parseLabel(structJson.collectionLabel);
    }

    return result;
  }

  private static parseBlock(structName: string, blockJson: any): IBlock {
    const result: IBlock = {
      condition: this.parseCondition(
        blockJson.condition,
        true
      ) as BlockConditionFunc,
      fields: [],
      hints: {
        layout: 'vertical'
      },
      items: [],
      name: blockJson.name,
      struct: structName
    };

    if (blockJson.label) {
      result.label = parseLabel(blockJson.label);
    }

    if (blockJson.hints) {
      if (blockJson.hints.layout) {
        result.hints.layout = blockJson.hints.layout;
      }
    }

    return result;
  }

  private static parseCondition(
    conditionJson: string,
    blockCondition: boolean = false
  ): BlockConditionFunc | FieldConditionFunc {
    let condition;

    if (conditionJson) {
      const conditionBody =
        conditionJson[0] === '{' ? conditionJson : `return ${conditionJson}`;

      const args = ['form', conditionBody];
      if (!blockCondition) {
        args.unshift('fieldParent');
      }

      condition = new Function(...args);
    } else {
      // tslint:disable-next-line:no-function-constructor-with-string-args
      condition = this.DEFAULT_CONDITION;
    }

    return condition;
  }
}
