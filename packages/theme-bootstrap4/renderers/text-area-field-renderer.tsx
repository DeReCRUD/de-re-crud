import { ITextAreaFieldRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import { h } from 'preact';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4TextAreaFieldRenderer = ({
  fieldType,
  label,
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
  errors,
}: ITextAreaFieldRenderer) => {
  return (
    <div className={`bootstrap4-${fieldType}-renderer`}>
      <Bootstrap4LabelRenderer fieldRequired={required}>
        {label}
      </Bootstrap4LabelRenderer>
      <textarea
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
        value={value}
      />
    </div>
  );
};

export default Bootstrap4TextAreaFieldRenderer;
