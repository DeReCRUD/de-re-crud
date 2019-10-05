import {
  h,
  ITextFieldRenderer,
  combineCssClasses,
  IIntegerFieldRenderer,
} from '@de-re-crud/ui';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4InputFieldRenderer = ({
  fieldType,
  label,
  value,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  min,
  max,
  minLength,
  maxLength,
  required,
  disabled,
  readOnly,
  errors,
}: Omit<ITextFieldRenderer, 'value'> &
  Omit<IIntegerFieldRenderer, 'value'> & { value?: string | number }) => {
  let inputType: string;

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
        min={min}
        max={max}
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
