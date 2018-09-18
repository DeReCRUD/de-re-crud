import { IRadioListFieldRenderer } from '@de-re-crud/core/models/renderers';
import Bootstrap3LabelRenderer from '@de-re-crud/renderer-bootstrap3/renderers/label-renderer';
import { h } from 'preact';

const Bootstrap3RadioListFieldRenderer = ({
  label,
  onFocus,
  onBlur,
  onChange,
  required,
  options
}: IRadioListFieldRenderer) => (
  <div className="bootstrap3-radio-list-field-renderer">
    {options.map((option) => (
      <div className="radio">
        <Bootstrap3LabelRenderer fieldRequired={required}>
          <input
            type="radio"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={option.value}
            checked={option.selected}
          />
          {label}
        </Bootstrap3LabelRenderer>
      </div>
    ))}
  </div>
);

export default Bootstrap3RadioListFieldRenderer;
