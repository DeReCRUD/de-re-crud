import {
  IStruct,
  ILabel,
  IField,
  IBlock,
  IStampField,
  ITextField,
  IIntegerField,
  IListField,
  IReferenceField,
  ILinkedStructField,
  IFieldReference,
  ILinkedStructFieldReference
} from './models/schema';

type SchemaMap<T> = { [key: string]: { parsed: T; json: any } };

export default class SchemaParser {
  private static defaultCondition = new Function('return true');
  private static parseLabel(
    labelJson?: string | { short?: string; medium?: string; long?: string }
  ): ILabel {
    let label: ILabel;

    if (typeof labelJson === 'string') {
      label = {
        short: labelJson,
        medium: labelJson,
        long: labelJson
      };
    } else {
      label = {
        short: labelJson.short || labelJson.medium || labelJson.long || '',
        medium: labelJson.medium || labelJson.short || labelJson.long || '',
        long: labelJson.long || labelJson.medium || labelJson.short || ''
      };
    }

    return label;
  }

  private static parseStruct(structJson: any): IStruct {
    const result: IStruct = {
      name: structJson.name,
      fields: [],
      blocks: []
    };

    if (structJson.label) {
      result.label = this.parseLabel(structJson.label);
    }

    if (structJson.collectionLabel) {
      result.collectionLabel = this.parseLabel(structJson.collectionLabel);
    }

    return result;
  }

  private static parseField(fieldJson: any): IField {
    const result: IField = {
      name: fieldJson.name,
      label: this.parseLabel(fieldJson.label),
      keyField: fieldJson.keyField || false,
      type: fieldJson.type,
      required: fieldJson.required || false,
      unique: fieldJson.unique || false
    };

    if (typeof fieldJson.help !== 'undefined') {
      result.help = fieldJson.help;
    }

    if (typeof fieldJson.initialValue !== 'undefined') {
      result.initialValue = fieldJson.initialValue;
    }

    if (typeof fieldJson.missingValue !== 'undefined') {
      result.missingValue = fieldJson.missingValue;
    }

    if (typeof fieldJson.placeholder !== 'undefined') {
      result.placeholder = fieldJson.placeholder;
    }

    switch (result.type) {
      case 'stamp': {
        const stampField = <IStampField>result;
        const { hints } = fieldJson;

        stampField.hints = {
          headerSize: (hints && hints.headerSize) || 3,
          displayClassNames: (hints && hints.displayClassNames) || []
        };

        break;
      }
      case 'text': {
        const textField = <ITextField>result;

        if (fieldJson.minLength) {
          textField.minLength = fieldJson.minLength;
        }

        if (fieldJson.maxLength) {
          textField.maxLength = fieldJson.maxLength;
        }

        break;
      }
      case 'integer': {
        const integerField = <IIntegerField>result;

        if (fieldJson.min) {
          integerField.min = fieldJson.min;
        }

        if (fieldJson.max) {
          integerField.max = fieldJson.max;
        }

        break;
      }
      case 'list': {
        const listField = <IListField>result;
        listField.options = [];

        fieldJson.options.forEach(option => {
          listField.options.push({
            label: option.label,
            value: option.value
          });
        });

        break;
      }
      case 'linkedStruct': {
        const linkedStructField = <ILinkedStructField>result;

        if (fieldJson.minInstances) {
          linkedStructField.minInstances = fieldJson.minInstances;
        }

        if (fieldJson.maxInstances) {
          linkedStructField.maxInstances = fieldJson.maxInstances;
        }
        break;
      }
    }

    return result;
  }

  private static parseBlock(blockJson: any): IBlock {
    const result: IBlock = {
      name: blockJson.name,
      condition: this.parseCondition(blockJson.condition),
      fields: []
    };

    if (blockJson.label) {
      result.label = this.parseLabel(blockJson.label);
    }

    return result;
  }

  private static parseCondition(
    conditionJson: string
  ): (value: any, rootValue: any) => boolean {
    let condition;

    if (conditionJson) {
      const returnValue =
        condition[0] === '{' ? condition : `return ${condition}`;

      // tslint:disable-next-line:no-function-constructor-with-string-args
      condition = new Function('value', 'rootValue', returnValue);
    } else {
      // tslint:disable-next-line:no-function-constructor-with-string-args
      condition = this.defaultCondition;
    }

    return condition;
  }

  static parse(schemaJson: any): IStruct[] {
    const structMap: SchemaMap<IStruct> = {};

    const structFieldMap: { [structName: string]: SchemaMap<IField> } = {};
    const structBlockMap: { [structName: string]: SchemaMap<IBlock> } = {};

    for (const structJson of schemaJson) {
      const fieldMap: SchemaMap<IField> = {};
      const blockMap: SchemaMap<IBlock> = {};

      structMap[structJson.name] = {
        parsed: this.parseStruct(structJson),
        json: structJson
      };

      for (const fieldJson of structJson.fields) {
        fieldMap[fieldJson.name] = {
          parsed: this.parseField(fieldJson),
          json: fieldJson
        };
      }

      structFieldMap[structJson.name] = fieldMap;

      for (const blockJson of structJson.blocks) {
        blockMap[blockJson.name] = {
          parsed: this.parseBlock(blockJson),
          json: blockJson
        };
      }

      structBlockMap[structJson.name] = blockMap;
    }

    Object.keys(structFieldMap).forEach(structName => {
      Object.keys(structFieldMap[structName]).forEach(fieldName => {
        const value = structFieldMap[structName][fieldName];
        const field = value.parsed;
        const json = value.json;

        switch (field.type) {
          case 'linkedStruct':
          case 'foreignKey': {
            const referenceField = <IReferenceField>field;
            const { reference } = json;

            referenceField.reference = {
              struct: structMap[reference.struct].parsed,
              block: structBlockMap[reference.struct][reference.block].parsed
            };
            break;
          }
        }
      });
    });

    Object.keys(structBlockMap).forEach(structName => {
      Object.keys(structBlockMap[structName]).forEach(blockName => {
        const value = structBlockMap[structName][blockName];
        const block = value.parsed;
        const json = value.json;

        json.fields.forEach(blockField => {
          const fieldValue = structFieldMap[structName][blockField.field || blockField];
          const field = fieldValue.parsed;
          const fieldJson = fieldValue.json;

          const fieldReference: IFieldReference = {
            field,
            condition: this.parseCondition(json.condition)
          };

          switch (field.type) {
            case 'linkedStruct': {
              const linkedStructFieldReference = <ILinkedStructFieldReference>(
                fieldReference
              );
              const { hints } = fieldJson;

              linkedStructFieldReference.hints = {
                layout: (hints && hints.layout) || 'inline'
              };

              if (hints && hints.block) {
                linkedStructFieldReference.hints.block =
                  structBlockMap[structName][hints.block].parsed;
              }

              break;
            }
          }

          block.fields.push(fieldReference);
        });
      });
    });

    return Object.keys(structMap).map((structName) => {
      const struct = structMap[structName].parsed;
      const json = structMap[structName].json;

      json.fields.forEach((field) => {
        struct.fields.push(structFieldMap[structName][field.name].parsed);
      });

      json.blocks.forEach((block) => {
        struct.blocks.push(structBlockMap[structName][block.name].parsed);
      });

      return struct;
    });
  }
}
