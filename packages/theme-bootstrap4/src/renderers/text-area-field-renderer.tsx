import { h, ITextAreaFieldRenderer, combineCssClasses } from '@de-re-crud/ui';

const Bootstrap4TextAreaFieldRenderer = ({
  renderFieldLabel,
  fieldPath,
  fieldName,
  fieldType,
  value,
  placeholder,
  cols,
  rows,
  maxLength,
  onFocus,
  onBlur,
  onChange,
  required,
  disabled,
  readOnly,
  tabIndex,
  errors,
}: ITextAreaFieldRenderer) => {
  return (
    <div className={`bootstrap4-${fieldType}-renderer`}>
      {renderFieldLabel()}
      <textarea
        id={fieldPath}
        name={fieldName}
        class={combineCssClasses('form-control', errors.length && 'is-invalid')}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        cols={cols}
        rows={rows}
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

export default Bootstrap4TextAreaFieldRenderer;
