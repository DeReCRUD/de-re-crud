import { IFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap3LabelRenderer from './label-renderer';

const Bootstrap3BooleanFieldRenderer = ({
  label,
  value,
  onFocus,
  onBlur,
  onChange,
  required
}: IFieldRenderer) => {
  const checkbox = (
    <span>
      <input
        type="checkbox"
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        checked={value}
      />
      {label}
    </span>
  );

  return (
    <div className="checkbox bootstrap3-boolean-field-renderer">
      <Bootstrap3LabelRenderer label={checkbox} fieldRequired={required} />
    </div>
  );
};

export default Bootstrap3BooleanFieldRenderer;
