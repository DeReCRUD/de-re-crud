import { IFieldRenderer } from '@de-re-crud/core/models/renderers';
import { FieldType } from '@de-re-crud/core/models/schema';
import { action } from '@storybook/addon-actions';

export function createDefaultProps(
  id: string,
  label: string,
  fieldType: FieldType,
): IFieldRenderer {
  return {
    rendererId: id,
    label: label,
    fieldName: id,
    fieldType,
    errors: [],
    busy: false,
    disabled: false,
    readOnly: false,
    hints: {},
    onBlur: action('blur'),
    onFocus: action('focus'),
    onChange: action('change'),
    onValueChange: action('value changed'),
    required: false,
  };
}
