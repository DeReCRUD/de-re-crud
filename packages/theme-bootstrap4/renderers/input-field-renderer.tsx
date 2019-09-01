import { h } from '@de-re-crud/ui';
import { ITextFieldRenderer } from '@de-re-crud/ui/renderers';
import { combineCssClasses } from '@de-re-crud/ui/renderers/utils';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4InputFieldRenderer = ({
  fieldType,
  label,
  value,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  minLength,
  maxLength,
  required,
  disabled,
  readOnly,
  errors,
}: ITextFieldRenderer) => {
  let inputType;

  switch (fieldType) {
    case 'date':
      inputType = fieldType;
      break;
    case 'integer':
    case 'estimate':
    case 'percent':
      inputType = 'number';
      break;
    default:
      inputType = 'text';
      break;
  }

  return (
    <div className={`bootstrap4-${fieldType}-renderer`}>
      <Bootstrap4LabelRenderer fieldRequired={required}>
        {label}
      </Bootstrap4LabelRenderer>
      <input
        class={combineCssClasses('form-control', errors.length && 'is-invalid')}
        type={inputType}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
      />
    </div>
  );
};

export default Bootstrap4InputFieldRenderer;
