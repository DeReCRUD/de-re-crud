import { FieldType, IOption, StampSize } from './schema';

export interface FieldContainerRendererProps {
  fieldName: string;
  fieldDescription?: string;
  errors: string[];
  children?: JSX.Element[];
}

export interface StampRendererProps {
  text: string;
  size: StampSize;
}

export type FieldFocusEvent = FocusEvent;
export type FieldBlurEvent = FocusEvent;
export type FieldChangeEvent = Event & {
  target: EventTarget & {
    type?: string;
    checked?: boolean;
    value: any;
  };
};

export interface FieldRendererProps {
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

export interface TextFieldRendererProps extends FieldRendererProps {
  minLength?: number;
  maxLength?: number;
}

export interface ListFieldRendererProps extends FieldRendererProps {
  options: IOption[];
}

export interface ForeignKeyFieldRendererProps extends ListFieldRendererProps {}

export interface TableLinkedStructRendererProps extends FieldRendererProps {
  headers: string[];
  value: string[][];
  valueErrorIndicators: { [index: number]: boolean };
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export interface InlinedLinkedStructRendererProps extends FieldRendererProps {
  renderedItems: JSX.Element[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export interface ButtonRendererProps {
  classes?: string | string[];
  text: string;
  disabled?: boolean;
  onClick: () => void;
}
