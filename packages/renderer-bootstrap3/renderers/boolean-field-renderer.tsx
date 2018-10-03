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
  required,
  readOnly
}: IBooleanFieldRenderer) => {
  return (
    <div className="bootstrap3-boolean-field-renderer checkbox">
      <Bootstrap3LabelRenderer fieldRequired={required}>
        <input
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          checked={value}
          disabled={readOnly}
        />
        {label}
      </Bootstrap3LabelRenderer>
    </div>
  );
};

export default Bootstrap3BooleanFieldRenderer;
