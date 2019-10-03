import {
  ISchemaJson,
  ILabel,
  ICustomHints,
  ICustomValidator,
  FieldType,
  StampSize,
  ConditionFunc,
} from './json';

export type ScalarFieldValue = string | number | boolean;
export type ObjectFieldValue = object | object[];

export type FieldValue = undefined | null | ScalarFieldValue | ObjectFieldValue;

export interface IErrors {
  [path: string]: string[];
}

export interface IChildErrors {
  [parentPath: string]: { [childIndex: number]: boolean };
}

export interface ICollectionReferenceParams {
  parentValue: any;
  formValue: any;
}

export type CollectionReference = (
  params: ICollectionReferenceParams,
) => object[];

export interface ICollectionReferences {
  [key: string]: CollectionReference;
}

export const DEFAULT_FIELD_WIDTH = 12;

export type ListValue = string | number;
export type ReferenceValue = ListValue | object;

export interface IStruct {
  name: string;
  label?: ILabel;
  collectionLabel?: ILabel;
  fields: string[];
  blocks: string[];
}

export interface IField {
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

export interface ITextField extends IField {
  type: 'text';
  initialValue?: string;
  missingValue?: string;
  minLength?: number;
  maxLength?: number;
  hints: IFieldHints & {
    layout: 'input' | 'textarea';
  };
}

export interface IIntegerField extends IField {
  type: 'integer';
  initialValue?: number;
  missingValue?: number;
  min?: number;
  max?: number;
}

export interface IOptions {
  label: ILabel;
  value: string | number;
}

export interface IListField extends IField {
  type: 'list';
  initialValue?: ListValue | ListValue[];
  missingValue?: ListValue | ListValue[];
  multiSelect: boolean;
  options: IOptions[];
  dynamicOptions: boolean;
  hints: IFieldHints & {
    layout: 'select' | 'radio';
  };
}

export interface IStructReference {
  struct: string;
}

export interface IReferenceField extends IField {
  type: 'linkedStruct' | 'foreignKey';
  initialValue?: ReferenceValue | ReferenceValue[];
  missingValue?: ReferenceValue | ReferenceValue[];
  reference: IStructReference;
}

export interface ILinkedStructField extends IReferenceField {
  type: 'linkedStruct';
  initialValue?: object[];
  missingValue?: object[];
  minInstances: number;
  maxInstances?: number;
  reference: IStructReference & {
    block: string;
  };
}

export interface IForeignKeyField extends IReferenceField {
  type: 'foreignKey';
  initialValue?: ListValue;
  missingValue?: ListValue;
  reference: IStructReference & {
    labelField: string;
  };
}

export interface IBlock {
  struct: string;
  name: string;
  label?: ILabel;
  condition: ConditionFunc;
  references: Array<
    IBlockReference | IFieldReference | ILinkedStructFieldReference | IStamp
  >;
  fields: Array<IFieldReference | ILinkedStructFieldReference>;
  hints: {
    layout: 'vertical' | 'horizontal';
    custom: ICustomHints;
  };
}

export interface IBlockReference {
  block: string;
}

export interface IFieldReference {
  field: string;
  condition: ConditionFunc;
  hints: {
    width?: number;
    custom: ICustomHints;
  };
}

export interface IStamp {
  text: string;
  size: StampSize;
  blockInstance: number;
  condition: ConditionFunc;
  hints: {
    custom: ICustomHints;
  };
}

export interface ILinkedStructFieldReference extends IFieldReference {
  hints: {
    width?: number;
    layout?: 'inline' | 'table';
    block?: string;
    custom: ICustomHints;
  };
}

export type FieldMap = Map<string, IField>;
export type BlockMap = Map<string, IBlock>;

export interface ISchema {
  structs: IStruct[];
  fields: ReadonlyMap<string, FieldMap>;
  blocks: ReadonlyMap<string, BlockMap>;
  customValidators: ICustomValidator[];
  json: ISchemaJson;
}
