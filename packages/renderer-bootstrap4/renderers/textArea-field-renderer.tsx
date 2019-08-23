import { ITextAreaFieldRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import Bootstrap4LabelRenderer from '@de-re-crud/renderer-bootstrap4/renderers/label-renderer';
import { h } from 'preact';

let textAreaRef: HTMLTextAreaElement;

function autoResize(e: any): EventHandlerNonNull {
  textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
  e();
  return;
}

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
        ref={(r) => (textAreaRef = r)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={autoResize(onChange)}
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
