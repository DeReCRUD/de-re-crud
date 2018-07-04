import { IField, FieldType } from './schema';

export interface FieldContainerRendererProps {
  fieldName: string;
  children?: JSX.Element[]
}

export type FieldFocusEvent = FocusEvent;
export type FieldBlurEvent = FocusEvent;
export type FieldChangeEvent = Event & {
  target: EventTarget & {
    value: any
  }
};

export interface FieldRendererProps {
  label: string;
  fieldName: string;
  fieldType: FieldType;
  required: boolean;
  onFocus: (e: FieldFocusEvent) => void;
  onBlur: (e: FieldBlurEvent) => void;
  onChange: (e: FieldChangeEvent) => void;
}

export interface TextFieldRendererProps extends FieldRendererProps {
  minLength?: number;
  maxLength?: number;
}

export interface LinkedStructRendererProps extends FieldRendererProps {
  onAdd: () => void;
  onEdit: (index: number) => void;
  onRemove: (index: number) => void;
}