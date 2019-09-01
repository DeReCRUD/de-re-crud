import {
  IBooleanFieldRenderer,
  FieldChangeEvent,
} from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4BooleanFieldRenderer = ({
  rendererId,
  label,
  value,
  onFocus,
  onBlur,
  onChange,
  required,
  disabled,
  readOnly,
}: IBooleanFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };

  return (
    <div className="bootstrap4-boolean-field-renderer custom-control custom-checkbox">
      <input
        id={rendererId}
        className="custom-control-input"
        type="checkbox"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onManagedChange}
        checked={value}
        disabled={disabled}
        readOnly={readOnly}
      />
      <Bootstrap4LabelRenderer
        htmlFor={rendererId}
        className="custom-control-label"
        fieldRequired={required}
      >
        {label}
      </Bootstrap4LabelRenderer>
    </div>
  );
};

export default Bootstrap4BooleanFieldRenderer;
