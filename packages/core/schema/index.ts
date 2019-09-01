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

/**
 * The container for De Re Crud's schema
 */
export interface ISchema {
  /**
   * The full list of structs used in the schema
   */
  structs: IStruct[];
  customValidators?: ICustomValidator[];
}

export interface ICustomValidator {
  name: string;
  pattern: RegExp;
  message: string;
  negate: boolean;
}

/**
 * Describes how to label a struct, field, or block.
 */
export interface ILabel {
  /**
   * The label to display when displaying on smaller displays
   */
  short: string;

  /**
   * The label to display when displaying on medium displays
   */
  medium: string;

  /**
   * The label to display when displaying on large displays
   */
  long: string;
}

/**
 * The primary object represented in De Re CRUD
 */
export interface IStruct {
  /**
   * The common name used to identify the type of struct
   */
  name: string;

  /**
   * Describes the struct in the UI
   */
  label?: string | ILabel;

  /**
   * Describes a collection of the struct in the UI
   */
  collectionLabel?: string | ILabel;

  /**
   * Array of [fields]{@link IField}
   */
  fields: (
    | ITextField
    | IKeywordField
    | IIntegerField
    | IEstimateField
    | IDateField
    | IBooleanField
    | IPercentField
    | IMoneyField
    | IForeignKeyField
    | ILinkedStructField
    | IListField
    | IDerivedField)[];

  /**
   * Array of [blocks]{@link IBlock}
   */
  blocks: IBlock[];
}

/**
 * The type of field
 */
export type FieldType =
  | 'text'
  /**
   * A string with no whitespace characters
   */
  | 'keyword'
  | 'integer'
  /**
   * The approximation of an decimal value
   */
  | 'estimate'
  | 'date'
  | 'boolean'
  | 'percent'
  | 'money'
  /**
   * Indicates a parent relationship of another struct
   */
  | 'foreignKey'
  /**
   * Indicates a relationship to another struct
   */
  | 'linkedStruct'
  /**
   * A preset list of possible values
   */
  | 'list'
  /**
   * A value derived from the values of other fields
   */
  | 'derived';

export interface IFieldHint {
  width?: number;
  readOnly?: boolean;
  custom?: ICustomHints;
}

export interface ICustomHints {
  [key: string]: any;
}

export interface IField {
  name: string;
  label: string | ILabel;
  type: FieldType;
  keyField?: boolean;
  required?: boolean;
  unique?: boolean;
  help?: string;
  initialValue?: any;
  missingValue?: any;
  placeholder?: string;
  hints?: IFieldHint;
  customValidators?: string[];
}

export interface ITextField extends IField {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  initialValue?: string;
  missingValue?: string;
  hints?: IFieldHint & {
    layout: 'input' | 'textarea';
  };
}

export interface IKeywordField extends IField {
  type: 'keyword';
  initialValue?: string;
  missingValue?: string;
}

export interface IIntegerField extends IField {
  type: 'integer';
  min?: number;
  max?: number;
  initialValue?: number;
  missingValue?: number;
}

export interface IEstimateField extends IField {
  type: 'estimate';
  initialValue?: number;
  missingValue?: number;
}

export interface IDateField extends IField {
  type: 'date';
  initialValue?: number | string | Date;
  missingValue?: number | string | Date;
}

export interface IBooleanField extends IField {
  type: 'boolean';
  initialValue?: boolean;
  missingValue?: boolean;
}

export interface IPercentField extends IField {
  type: 'percent';
  initialValue?: number;
  missingValue?: number;
}

export interface IMoneyField extends IField {
  type: 'money';
  initialValue?: number;
  missingValue?: number;
}

export interface IReference {
  struct: string;
}

export interface IForeignKeyField extends IField {
  type: 'foreignKey';
  reference: IReference & {
    labelField: string;
  };
  initialValue?: string;
  missingValue?: string;
}

export interface ILinkedStructField extends IField {
  type: 'linkedStruct';
  reference: IReference & {
    labelField: string;
    block?: string;
  };
  minInstances?: number;
  maxInstances?: number;
  initialValue?: string[] | number[];
  missingValue?: string[] | number[];
}

export interface IDerivedField extends IField {
  type: 'derived';
  pattern: string;
  initialValue?: string;
  missingValue?: string;
}

export interface IOption {
  label: string | ILabel;
  value: string | number;
}

export interface IListField extends IField {
  type: 'list';
  options: IOption[];
  multiSelect?: boolean;
  dynamicOptions?: boolean;
  hints?: IFieldHint & {
    layout: 'select' | 'radio';
  };
}

export interface IConditionParams {
  path: string;
  parentValue: object | object[];
  formValue: object;
}

export type ConditionFunc = (params: IConditionParams) => boolean;
export type Condition = string | ConditionFunc;

export interface IBlock {
  name: string;
  label?: string | ILabel;
  condition?: Condition;
  references: (string | IFieldReference | IBlockReference | IStampReference)[];
  hints?: IBlockHint;
}

export interface IBlockHint {
  layout?: 'vertical' | 'horizontal';
  custom?: ICustomHints;
}

export interface IFieldReference {
  field: string;
  condition?: Condition;
  hints?: IFieldReferenceHints | ILinkedStructFieldReferenceHints;
}

export interface IFieldReferenceHints {
  width?: number;
  custom?: ICustomHints;
}

export interface ILinkedStructFieldReferenceHints {
  width?: number;
  layout?: 'inline' | 'table';
  block?: string;
  custom?: ICustomHints;
}

export interface IBlockReference {
  block: string;
}

export type StampSize = 1 | 2 | 3 | 4 | 5 | 6;

export interface IStampReference {
  stamp: string;
  size?: StampSize;
  condition?: Condition;
  hints?: ICustomHints;
}
