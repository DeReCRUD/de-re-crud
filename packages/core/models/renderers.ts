import { FieldType, IOption, StampSize } from './schema';

export interface ISelectableOption extends IOption {
  selected: boolean;
}

export interface IRenderer {
  rendererId: string;
}

export interface IBlockCell {
  width: number;
  renderedItem: JSX.Element;
}

export interface IBlockRow {
  cells: IBlockCell[];
}

export interface IBlockContainerRenderer extends IRenderer {
  rows: IBlockRow[];
}

export interface IFieldContainerRenderer extends IRenderer {
  fieldName: string;
  fieldDescription?: string;
  errors: string[];
  renderedField?: JSX.Element;
}

export interface IStampRenderer extends IRenderer {
  text: string;
  size: StampSize;
}

export type FieldFocusEvent = FocusEvent;
export type FieldBlurEvent = FocusEvent;

export type CheckboxEventTarget = EventTarget & {
  type: 'checkbox';
  checked: boolean;
};

export type MultipleSelectEventTarget = EventTarget & {
  type: 'select-multiple';
  options: [
    {
      selected: boolean;
      value: any;
    }
  ];
};

export type GenericEventTarget = EventTarget & {
  type: '';
  value: any;
};

export type TypedEventTarget =
  | CheckboxEventTarget
  | MultipleSelectEventTarget
  | GenericEventTarget;

export type FieldChangeEvent = Event & {
  target: TypedEventTarget;
};

export interface IFieldRenderer extends IRenderer {
  label: string;
  placeholder?: string;
  fieldName: string;
  fieldType: FieldType;
  fieldDescription?: string;
  errors: string[];
  value?: any;
  required: boolean;
  onFocus: (e: FieldFocusEvent) => void;
  onBlur: (e: FieldBlurEvent) => void;
  onChange: (e: FieldChangeEvent) => void;
}

export interface ITextFieldRenderer extends IFieldRenderer {
  minLength?: number;
  maxLength?: number;
}

export interface IListFieldRenderer extends IFieldRenderer {
  multiSelect: boolean;
  options: ISelectableOption[];
}

export interface IForeignKeyFieldRenderer extends IFieldRenderer {
  options: ISelectableOption[];
}

export interface ITableLinkedStructRenderer extends IFieldRenderer {
  headers: string[];
  value: string[][];
  valueErrorIndicators: { [index: number]: boolean };
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export interface IInlinedLinkedStructRenderer extends IFieldRenderer {
  renderedItems: JSX.Element[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export interface IButtonRenderer {
  classes?: string | string[];
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
