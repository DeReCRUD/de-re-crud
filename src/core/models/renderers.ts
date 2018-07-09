import { FieldType, IOption } from './schema';

export interface FieldContainerRendererProps {
  fieldName: string;
  children?: JSX.Element[];
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

export interface LinkedStructRendererProps extends FieldRendererProps {
  headers: string[];
  value?: string[][];
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}

export interface ButtonRendererProps {
  classes?: string | string[];
  text: string;
  onClick: () => void;
}
