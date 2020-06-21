import { FieldType } from '@de-re-crud/core';
import { h, IFieldRenderer } from '@de-re-crud/ui';
import { Bootstrap4FieldLabelRenderer } from '@de-re-crud/theme-bootstrap4';
import { action } from '@storybook/addon-actions';

export function createDefaultProps(
  id: string,
  label: string,
  fieldType: FieldType,
): IFieldRenderer {
  return {
    formId: 'form1',
    rendererId: id,
    renderFieldLabel: () => {
      return (
        <Bootstrap4FieldLabelRenderer
          formId="formId"
          rendererId={id}
          label={label}
          fieldType={fieldType}
          fieldRequired={false}
          fieldName={id}
          fieldPath={id}
          errors={[]}
          hints={{}}
          onValueChange={action('value changed')}
        />
      );
    },
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
