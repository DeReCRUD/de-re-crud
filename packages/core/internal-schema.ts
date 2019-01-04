import {
  ILabel,
  FieldType,
  FieldValue,
  BlockConditionFunc,
  FieldConditionFunc,
  StampSize,
  ReferenceValue,
  IOption,
  ListValue,
} from './models/schema';

export interface IInternalStruct {
  name: string;
  label?: ILabel;
  collectionLabel?: ILabel;
  fields: string[];
  blocks: string[];
}

export interface IInternalField {
  struct: string;
  name: string;
  label?: ILabel;
  keyField: boolean;
  type: FieldType;
  required: boolean;
  unique: boolean;
  help?: string;
  initialValue?: FieldValue;
  missingValue?: FieldValue;
  placeholder?: string;
  hints: {
    width: number;
  };
}

export interface IInternalTextField extends IInternalField {
  type: 'text';
  initialValue?: string;
  missingValue?: string;
  minLength?: number;
  maxLength?: number;
}

export interface IInternalIntegerField extends IInternalField {
  type: 'integer';
  initialValue?: number;
  missingValue?: number;
  min?: number;
  max?: number;
}

export interface IInternalListField extends IInternalField {
  type: 'list';
  initialValue?: ListValue | ListValue[];
  missingValue?: ListValue | ListValue[];
  multiSelect: boolean;
  options: IOption[];
  dynamicOptions: boolean;
  hints: {
    width: number;
    layout: 'select' | 'radio';
  };
}

export interface IInternalStructReference {
  struct: string;
  block: string;
}

export interface IInternalReferenceField extends IInternalField {
  type: 'linkedStruct' | 'foreignKey';
  initialValue?: ReferenceValue | ReferenceValue[];
  missingValue?: ReferenceValue | ReferenceValue[];
  reference: IInternalStructReference;
}

export interface IInternalLinkedStructField extends IInternalReferenceField {
  type: 'linkedStruct';
  initialValue?: object[];
  missingValue?: object[];
  minInstances: number;
  maxInstances?: number;
}

export interface IInternalForeignKeyField extends IInternalReferenceField {
  type: 'foreignKey';
  initialValue?: ListValue;
  missingValue?: ListValue;
  reference: IInternalStructReference & {
    labelField: string;
  };
}

export interface IInternalBlock {
  struct: string;
  name: string;
  label?: ILabel;
  condition: BlockConditionFunc;
  items: Array<
    | IInternalBlockReference
    | IInternalFieldReference
    | IInternalLinkedStructFieldReference
    | IInternalStamp
  >;
  fields: Array<IInternalFieldReference | IInternalLinkedStructFieldReference>;
  hints: {
    layout: 'vertical' | 'horizontal';
  };
}

export interface IInternalBlockReference {
  block: string;
}

export interface IInternalFieldReference {
  field: string;
  condition: FieldConditionFunc;
  hints: {
    width?: number;
  };
}

export interface IInternalStamp {
  text: string;
  size: StampSize;
  blockInstance: number;
  condition: FieldConditionFunc;
}

export interface IInternalLinkedStructFieldReference
  extends IInternalFieldReference {
  hints: {
    width?: number;
    layout?: 'inline' | 'table';
    block?: string;
  };
}

export type FieldMap = Map<string, IInternalField>;
export type BlockMap = Map<string, IInternalBlock>;

export interface IInternalSchema {
  structs: ReadonlyArray<IInternalStruct>;
  fields: ReadonlyMap<string, FieldMap>;
  blocks: ReadonlyMap<string, BlockMap>;
}
