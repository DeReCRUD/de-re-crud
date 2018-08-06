import {
  BlockConditionFunc,
  FieldConditionFunc,
  IBlock,
  IField,
  IFieldReference,
  IIntegerField,
  ILabel,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IListField,
  IReferenceField,
  IStamp,
  IStruct,
  ITextField
} from "./models/schema";

interface ISchemaMap<T> {
  [key: string]: { parsed: T; json: any };
}

export default class SchemaParser {
  public static parse(schemaJson: any): IStruct[] {
    const structMap: ISchemaMap<IStruct> = {};

    const structFieldMap: { [structName: string]: ISchemaMap<IField> } = {};
    const structBlockMap: { [structName: string]: ISchemaMap<IBlock> } = {};

    for (const structJson of schemaJson) {
      const fieldMap: ISchemaMap<IField> = {};
      const blockMap: ISchemaMap<IBlock> = {};

      structMap[structJson.name] = {
        json: structJson,
        parsed: this.parseStruct(structJson)
      };

      for (const fieldJson of structJson.fields) {
        fieldMap[fieldJson.name] = {
          json: fieldJson,
          parsed: this.parseField(fieldJson)
        };
      }

      structFieldMap[structJson.name] = fieldMap;

      for (const blockJson of structJson.blocks) {
        blockMap[blockJson.name] = {
          json: blockJson,
          parsed: this.parseBlock(blockJson)
        };
      }

      structBlockMap[structJson.name] = blockMap;
    }

    Object.keys(structFieldMap).forEach((structName) => {
      Object.keys(structFieldMap[structName]).forEach((fieldName) => {
        const value = structFieldMap[structName][fieldName];
        const field = value.parsed;
        const json = value.json;

        switch (field.type) {
          case "linkedStruct":
          case "foreignKey": {
            const referenceField = field as IReferenceField;
            const { reference } = json;

            referenceField.reference = {
              block:
                structBlockMap[reference.struct][reference.block || "default"]
                  .parsed,
              struct: structMap[reference.struct].parsed
            };
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
          } else if (blockField.field || typeof blockField === "string") {
            const fieldName = blockField.field || blockField;
            const fieldValue = structFieldMap[structName][fieldName];
            const field = fieldValue.parsed;

            const fieldReference: IFieldReference = {
              condition: this.parseCondition(blockField.condition),
              field
            };

            switch (field.type) {
              case "linkedStruct": {
                const linkedStructField = field as ILinkedStructField;
                const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;

                const { hints } = blockField;

                linkedStructFieldReference.hints = {
                  layout: (hints && hints.layout) || "inline"
                };

                linkedStructFieldReference.hints.block =
                  structBlockMap[linkedStructField.reference.struct.name][
                    (hints && hints.block) || "default"
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

  private static defaultCondition = new Function("return true");

  private static parseLabel(
    labelJson?: string | { short?: string; medium?: string; long?: string }
  ): ILabel {
    let label: ILabel;

    if (typeof labelJson === "string") {
      label = {
        long: labelJson,
        medium: labelJson,
        short: labelJson
      };
    } else {
      label = {
        long: labelJson.long || labelJson.medium || labelJson.short || "",
        medium: labelJson.medium || labelJson.short || labelJson.long || "",
        short: labelJson.short || labelJson.medium || labelJson.long || ""
      };
    }

    return label;
  }

  private static parseStruct(structJson: any): IStruct {
    const result: IStruct = {
      blocks: [],
      fields: [],
      name: structJson.name
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
      keyField: fieldJson.keyField || false,
      label: this.parseLabel(fieldJson.label),
      name: fieldJson.name,
      required: fieldJson.required || false,
      type: fieldJson.type,
      unique: fieldJson.unique || false
    };

    if (typeof fieldJson.help !== "undefined") {
      result.help = fieldJson.help;
    }

    if (typeof fieldJson.initialValue !== "undefined") {
      result.initialValue = fieldJson.initialValue;
    }

    if (typeof fieldJson.missingValue !== "undefined") {
      result.missingValue = fieldJson.missingValue;
    }

    if (typeof fieldJson.placeholder !== "undefined") {
      result.placeholder = fieldJson.placeholder;
    } else {
      result.placeholder = result.label.short;
    }

    switch (result.type) {
      case "text": {
        const textField = result as ITextField;

        if (fieldJson.minLength) {
          textField.minLength = fieldJson.minLength;
        }

        if (fieldJson.maxLength) {
          textField.maxLength = fieldJson.maxLength;
        }

        break;
      }
      case "integer": {
        const integerField = result as IIntegerField;

        if (fieldJson.min) {
          integerField.min = fieldJson.min;
        }

        if (fieldJson.max) {
          integerField.max = fieldJson.max;
        }

        break;
      }
      case "list": {
        const listField = result as IListField;
        listField.options = [];

        fieldJson.options.forEach((option) => {
          listField.options.push({
            label: option.label,
            value: option.value
          });
        });

        break;
      }
      case "linkedStruct": {
        const linkedStructField = result as ILinkedStructField;

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
      condition: this.parseCondition(
        blockJson.condition,
        true
      ) as BlockConditionFunc,
      fields: [],
      items: [],
      name: blockJson.name
    };

    if (blockJson.label) {
      result.label = this.parseLabel(blockJson.label);
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
        conditionJson[0] === "{" ? conditionJson : `return ${conditionJson}`;

      const args = ["form", conditionBody];
      if (!blockCondition) {
        args.unshift("fieldParent");
      }

      condition = new Function(...args);
    } else {
      // tslint:disable-next-line:no-function-constructor-with-string-args
      condition = this.defaultCondition;
    }

    return condition;
  }
}
