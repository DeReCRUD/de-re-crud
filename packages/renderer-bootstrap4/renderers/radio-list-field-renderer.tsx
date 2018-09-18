import { IRadioListFieldRenderer } from '@de-re-crud/core/models/renderers';
import Bootstrap4LabelRenderer from '@de-re-crud/renderer-bootstrap4/renderers/label-renderer';
import { h } from 'preact';

const Bootstrap4RadioListFieldRenderer = ({
  rendererId,
  label,
  onFocus,
  onBlur,
  onChange,
  required,
  options
}: IRadioListFieldRenderer) => (
  <div className="bootstrap4-radio-list-field-renderer">
    {options.map((option) => (
      <div className="custom-control custom-radio">
        <input
          id={rendererId}
          className="custom-control-input"
          type="radio"
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={option.value}
          checked={option.selected}
        />
        <Bootstrap4LabelRenderer
          htmlFor={rendererId}
          className="custom-control-label"
          fieldRequired={required}
        >
          w{label}
        </Bootstrap4LabelRenderer>
      </div>
    ))}
  </div>
);

export default Bootstrap4RadioListFieldRenderer;
