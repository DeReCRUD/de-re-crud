import { FieldType } from '@de-re-crud/core';
import { IFieldRenderer } from '@de-re-crud/ui';
import { action } from '@storybook/addon-actions';

export function createDefaultProps(
  id: string,
  label: string,
  fieldType: FieldType,
): IFieldRenderer {
  return {
    formId: 'form1',
    rendererId: id,
    label,
    fieldName: id,
    fieldPath: id,
    fieldType,
    errors: [],
    busy: false,
    disabled: false,
    readOnly: false,
    tabIndex: undefined,
    hints: {},
    onBlur: action('blur'),
    onFocus: action('focus'),
    onChange: action('change'),
    onValueChange: action('value changed'),
    required: false,
  };
}
