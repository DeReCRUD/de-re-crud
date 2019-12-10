import {
  ICustomHints,
  StampSize,
  FieldValue,
  FieldType,
  ScalarFieldValue,
} from '@de-re-crud/core';
import { h } from '..';

export interface ISelectableOption {
  label: string;
  value: string | number;
  selected: boolean;
}

export interface IRenderer {
  formId: string;
  rendererId: string;
  hints: ICustomHints;
}

export interface IBlockCell {
  width: number;
  renderedItem: h.JSX.Element;
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
  renderedField?: h.JSX.Element;
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
      value: ScalarFieldValue;
    }
  ];
};

export type GenericEventTarget = EventTarget & {
  type: '';
  value: ScalarFieldValue;
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
  value?: FieldValue;
  required: boolean;
  busy: boolean;
  readOnly: boolean;
  disabled: boolean;
  onFocus: (e: FieldFocusEvent) => void;
  onBlur: (e: FieldBlurEvent) => void;
  onChange: (e: FieldChangeEvent) => void;
  onValueChange: (e: ScalarFieldValue) => void;
}

export interface ITextFieldRenderer extends IFieldRenderer {
  minLength?: number;
  maxLength?: number;
  value?: string | number;
}

export interface ITextAreaFieldRenderer extends IFieldRenderer {
  cols?: number;
  rows?: number;
  wrap?: string;
  maxLength?: number;
  value?: string | number;
}

export interface IKeywordFieldRenderer extends IFieldRenderer {
  value?: string;
}

export interface IDerivedFieldRenderer extends IFieldRenderer {
  value?: string;
}

export interface IDateFieldRenderer extends IFieldRenderer {
  value?: string;
}

export interface IIntegerFieldRenderer extends IFieldRenderer {
  min?: number;
  max?: number;
  value?: number;
}

export interface IEstimateFieldRenderer extends IFieldRenderer {
  value?: number;
}

export interface IPercentFieldRenderer extends IFieldRenderer {
  value?: number;
}

export interface IMoneyFieldRenderer extends IFieldRenderer {
  value?: number;
}

export interface IBooleanFieldRenderer extends IFieldRenderer {
  value?: boolean;
}

export interface ISelectListFieldRenderer extends IFieldRenderer {
  dynamicOptions: boolean;
  options: ISelectableOption[];
}

export interface IMultiSelectListFieldRenderer
  extends ISelectListFieldRenderer {}

export interface IRadioListFieldRenderer extends IFieldRenderer {
  options: ISelectableOption[];
}

export interface IForeignKeyFieldRenderer extends IFieldRenderer {
  options: ISelectableOption[];
}

export interface ITableLinkedStructFieldRenderer extends IFieldRenderer {
  headers: string[];
  value: string[][];
  minInstances: number;
  maxInstances: number;
  valueErrorIndicators: { [index: number]: boolean };
  busyValues: { [index: number]: boolean };
  disabledValues: { [index: number]: boolean };
  canAdd: () => boolean;
  canRemove: (index: number) => boolean;
  onAdd: (value?: object, navigate?: boolean) => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export interface IInlineLinkedStructFieldRenderer extends IFieldRenderer {
  renderedItems: h.JSX.Element[];
  busyRenderedItems: { [index: number]: boolean };
  disabledRenderedItems: { [index: number]: boolean };
  canAdd: () => boolean;
  canRemove: (index: number) => boolean;
  onAdd: (value?: object) => void;
  onRemove: (index: number) => void;
}

export interface IButtonRenderer {
  classes?: string | string[];
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
