import { IBooleanFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import './boolean-field-renderer.css';
import Bootstrap3LabelRenderer from './label-renderer';

const Bootstrap3BooleanFieldRenderer = ({
  label,
  value,
  onFocus,
  onBlur,
  onChange,
  required
}: IBooleanFieldRenderer) => {
  return (
    <div className="checkbox bootstrap3-boolean-field-renderer">
      <Bootstrap3LabelRenderer fieldRequired={required}>
        <input
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onInput={onChange}
          checked={value}
        />
        {label}
      </Bootstrap3LabelRenderer>
    </div>
  );
};

export default Bootstrap3BooleanFieldRenderer;
