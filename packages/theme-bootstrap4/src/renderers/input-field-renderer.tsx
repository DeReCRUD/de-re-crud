import {
  h,
  ITextFieldRenderer,
  combineCssClasses,
  IIntegerFieldRenderer,
} from '@de-re-crud/ui';

const Bootstrap4InputFieldRenderer = ({
  renderFieldLabel,
  fieldPath,
  fieldName,
  fieldType,
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
  tabIndex,
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
      {renderFieldLabel()}
      <input
        id={fieldPath}
        name={fieldName}
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
        tabIndex={tabIndex}
        value={value}
      />
    </div>
  );
};

export default Bootstrap4InputFieldRenderer;
