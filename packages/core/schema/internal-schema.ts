import {
  ISchema,
  ILabel,
  ICustomHints,
  ICustomValidator,
  FieldType,
  StampSize,
  ConditionFunc,
} from '.';

export const DEFAULT_FIELD_WIDTH = 12;

export type ListValue = string | number;
export type ReferenceValue = ListValue | object;

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
  label: ILabel;
  keyField: boolean;
  type: FieldType;
  required: boolean;
  unique: boolean;
  help?: string;
  initialValue?: any;
  missingValue?: any;
  placeholder?: string;
  hints: IFieldHints;
  customValidators: string[];
}

export interface IFieldHints {
  width: number;
  readOnly: boolean;
  custom: ICustomHints;
}

export interface IInternalTextField extends IInternalField {
  type: 'text';
  initialValue?: string;
  missingValue?: string;
  minLength?: number;
  maxLength?: number;
  hints: IFieldHints & {
    layout: 'input' | 'textarea';
  };
}

export interface IInternalIntegerField extends IInternalField {
  type: 'integer';
  initialValue?: number;
  missingValue?: number;
  min?: number;
  max?: number;
}

export interface IInternalOptions {
  label: ILabel;
  value: string | number;
}

export interface IInternalListField extends IInternalField {
  type: 'list';
  initialValue?: ListValue | ListValue[];
  missingValue?: ListValue | ListValue[];
  multiSelect: boolean;
  options: IInternalOptions[];
  dynamicOptions: boolean;
  hints: IFieldHints & {
    layout: 'select' | 'radio';
  };
}

export interface IInternalStructReference {
  struct: string;
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
  reference: IInternalStructReference & {
    block: string;
  };
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
  condition: ConditionFunc;
  references: Array<
    | IInternalBlockReference
    | IInternalFieldReference
    | IInternalLinkedStructFieldReference
    | IInternalStamp
  >;
  fields: Array<IInternalFieldReference | IInternalLinkedStructFieldReference>;
  hints: {
    layout: 'vertical' | 'horizontal';
    custom: ICustomHints;
  };
}

export interface IInternalBlockReference {
  block: string;
}

export interface IInternalFieldReference {
  field: string;
  condition: ConditionFunc;
  hints: {
    width?: number;
    custom: ICustomHints;
  };
}

export interface IInternalStamp {
  text: string;
  size: StampSize;
  blockInstance: number;
  condition: ConditionFunc;
  hints: {
    custom: ICustomHints;
  };
}

export interface IInternalLinkedStructFieldReference
  extends IInternalFieldReference {
  hints: {
    width?: number;
    layout?: 'inline' | 'table';
    block?: string;
    custom: ICustomHints;
  };
}

export type FieldMap = Map<string, IInternalField>;
export type BlockMap = Map<string, IInternalBlock>;

export interface IInternalSchema {
  structs: IInternalStruct[];
  fields: ReadonlyMap<string, FieldMap>;
  blocks: ReadonlyMap<string, BlockMap>;
  customValidators: ICustomValidator[];
  raw: ISchema;
}