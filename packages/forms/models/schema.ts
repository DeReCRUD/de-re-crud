export type StampSize = 1 | 2 | 3 | 4 | 5 | 6;

export type FieldConditionFunc = (fieldParent: any, form: any) => boolean;
export type BlockConditionFunc = (form: any) => boolean;

export type FieldType =
  | "text"
  | "keyword"
  | "integer"
  | "estimate"
  | "date"
  | "boolean"
  | "percent"
  | "money"
  | "foreignKey"
  | "linkedStruct"
  | "list"
  | "derived"
  | "stamp";

export interface ILabel {
  short: string;
  medium: string;
  long: string;
}

export interface IStruct {
  name: string;
  label?: ILabel;
  collectionLabel?: ILabel;
  fields: IField[];
  blocks: IBlock[];
}

export interface IField {
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
}

export interface ITextField extends IField {
  type: "text";
  initialValue?: string;
  missingValue?: string;
  minLength?: number;
  maxLength?: number;
}

export interface IIntegerField extends IField {
  type: "integer";
  initialValue?: number;
  missingValue?: number;
  min?: number;
  max?: number;
}

export interface IListField extends IField {
  type: "list";
  initialValue?: any[];
  missingValue?: any[];
  options: IOption[];
}

export interface IOption {
  label: string;
  value: any;
}

export interface IReferenceField extends IField {
  type: "linkedStruct" | "foreignKey";
  initialValue?: any[] | object;
  reference: {
    struct: IStruct;
    block: IBlock;
  };
}

export interface ILinkedStructField extends IReferenceField {
  type: "linkedStruct";
  initialValue?: any[];
  minInstances?: number;
  maxInstances?: number;
}

export interface IForeignKeyField extends IReferenceField {
  type: "foreignKey";
  initialValue?: object;
}

export interface IBlock {
  name: string;
  label?: ILabel;
  condition: BlockConditionFunc;
  items: Array<IFieldReference | ILinkedStructFieldReference | IStamp>;
  fields: Array<IFieldReference | ILinkedStructFieldReference>;
}

export interface IFieldReference {
  field: IField;
  condition: FieldConditionFunc;
}

export interface IStamp {
  text: string;
  size: StampSize;
  blockInstance: number;
  condition: FieldConditionFunc;
}

export interface ILinkedStructFieldReference extends IFieldReference {
  hints: {
    layout: "inline" | "table";
    block?: IBlock;
  };
}
