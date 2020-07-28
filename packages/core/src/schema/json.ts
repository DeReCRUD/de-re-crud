/**
 * The container for De Re Crud's schema
 */
export interface ISchemaJson {
  /**
   * The full list of structs used in the schema
   */
  structs: IStructJson[];
  customValidators?: ICustomValidator[];
  defaultValidatorMessages?: Partial<IDefaultValidatorMessages>;
}

export interface ICustomValidator {
  name: string;
  pattern: RegExp;
  message: string;
  negate: boolean;
}

export interface IDefaultValidatorMessages {
  keyword: string;
  minLength: string;
  maxLength: string;
  min: string;
  max: string;
  minInstances: string;
  maxInstances: string;
  unique: string;
  required: string;
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
export interface IStructJson {
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
   * Array of [fields]{@link IFieldJson}
   */
  fields: (
    | ITextFieldJson
    | IKeywordFieldJson
    | IIntegerFieldJson
    | IEstimateFieldJson
    | IDateFieldJson
    | IBooleanFieldJson
    | IPercentFieldJson
    | IMoneyFieldJson
    | IForeignKeyFieldJson
    | ILinkedStructFieldJson
    | IListFieldJson
    | IDerivedFieldJson)[];

  /**
   * Array of [blocks]{@link IBlockJson}
   */
  blocks: IBlockJson[];
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

export interface IFieldJson {
  name: string;
  label: string | ILabel;
  type: FieldType;
  keyField?: boolean;
  deletionField?: boolean;
  required?: boolean;
  unique?: boolean;
  help?: string;
  initialValue?: any;
  missingValue?: any;
  placeholder?: string;
  hints?: IFieldHint;
  customValidators?: string[];
  defaultValidatorMessages?: Partial<IDefaultValidatorMessages>;
}

export interface ITextFieldJson extends IFieldJson {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  initialValue?: string;
  missingValue?: string;
  hints?: IFieldHint & {
    layout: 'input' | 'textarea';
  };
}

export interface IKeywordFieldJson extends IFieldJson {
  type: 'keyword';
  initialValue?: string;
  missingValue?: string;
}

export interface IIntegerFieldJson extends IFieldJson {
  type: 'integer';
  min?: number;
  max?: number;
  initialValue?: number;
  missingValue?: number;
}

export interface IEstimateFieldJson extends IFieldJson {
  type: 'estimate';
  initialValue?: number;
  missingValue?: number;
}

export interface IDateFieldJson extends IFieldJson {
  type: 'date';
  initialValue?: number | string | Date;
  missingValue?: number | string | Date;
}

export interface IBooleanFieldJson extends IFieldJson {
  type: 'boolean';
  initialValue?: boolean;
  missingValue?: boolean;
}

export interface IPercentFieldJson extends IFieldJson {
  type: 'percent';
  initialValue?: number;
  missingValue?: number;
}

export interface IMoneyFieldJson extends IFieldJson {
  type: 'money';
  initialValue?: number;
  missingValue?: number;
}

export interface IReferenceJson {
  struct: string;
}

export interface IForeignKeyFieldJson extends IFieldJson {
  type: 'foreignKey';
  reference: IReferenceJson & {
    labelField: string;
  };
  initialValue?: string;
  missingValue?: string;
}

export interface ILinkedStructFieldJson extends IFieldJson {
  type: 'linkedStruct';
  reference: IReferenceJson & {
    labelField: string;
    block?: string;
  };
  minInstances?: number;
  maxInstances?: number;
  initialValue?: string[] | number[];
  missingValue?: string[] | number[];
  hints: IFieldHint & {
    layout: 'inline' | 'table';
  };
}

export interface IDerivedFieldJson extends IFieldJson {
  type: 'derived';
  pattern: string;
  initialValue?: string;
  missingValue?: string;
}

export interface IOptionJson {
  label: string | ILabel;
  value: string | number;
}

export interface IListFieldJson extends IFieldJson {
  type: 'list';
  options: IOptionJson[];
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

export interface IBlockJson {
  name: string;
  label?: string | ILabel;
  condition?: Condition;
  references: (
    | string
    | IFieldReferenceJson
    | IBlockReferenceJson
    | IStampReferenceJson)[];
  hints?: IBlockHintJson;
}

export interface IBlockHintJson {
  layout?: 'vertical' | 'horizontal';
  custom?: ICustomHints;
}

export interface IFieldReferenceJson {
  field: string;
  condition?: Condition;
  hints?: IFieldReferenceHintsJson | ILinkedStructFieldReferenceHintsJson;
}

export interface IFieldReferenceHintsJson {
  width?: number;
  custom?: ICustomHints;
}

export interface ILinkedStructFieldReferenceHintsJson {
  width?: number;
  layout?: 'inline' | 'table';
  block?: string;
  custom?: ICustomHints;
}

export interface IBlockReferenceJson {
  block: string;
}

export type StampSize = 1 | 2 | 3 | 4 | 5 | 6;

export interface IStampReferenceJson {
  stamp: string;
  size?: StampSize;
  condition?: Condition;
  hints?: ICustomHints;
}
