import {
  IBooleanFieldRenderer,
  FieldChangeEvent,
} from '@de-re-crud/core/models/renderers';
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
  readOnly,
}: IBooleanFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };

  return (
    <div className="bootstrap3-boolean-field-renderer checkbox">
      <Bootstrap3LabelRenderer fieldRequired={required}>
        <input
          type="checkbox"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onManagedChange}
          checked={value}
          disabled={readOnly}
        />
        {label}
      </Bootstrap3LabelRenderer>
    </div>
  );
};

export default Bootstrap3BooleanFieldRenderer;
