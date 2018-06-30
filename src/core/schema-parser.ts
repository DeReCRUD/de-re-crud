import { IStruct, ILabel } from './models/schema';

export default class SchemaParser {
  private static parseLabel(labelJson?: string | { short?: string; medium?: string; long?: string; }): ILabel {
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



  static parse(schemaJson: any): IStruct[] {
    const structs: IStruct[] = [];

    for (const structJson of schemaJson) {
      structs.push(this.parseStruct(structJson));
    }

    return structs;
  }
}
