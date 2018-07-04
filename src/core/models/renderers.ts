import { IField, FieldType } from './schema';

export interface FieldContainerRendererProps {
  field: IField;
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
  onFocus: (e: FieldFocusEvent) => void;
  onBlur: (e: FieldBlurEvent) => void;
  onChange: (e: FieldChangeEvent) => void;
}