import { IRadioListFieldRenderer } from '@de-re-crud/core/models/renderers';
import Bootstrap3LabelRenderer from '@de-re-crud/renderer-bootstrap3/renderers/label-renderer';
import { h } from 'preact';

const Bootstrap3RadioListFieldRenderer = ({
  label,
  onFocus,
  onBlur,
  onChange,
  required,
  readOnly,
  options,
}: IRadioListFieldRenderer) => (
  <div className="bootstrap3-radio-list-field-renderer">
    <Bootstrap3LabelRenderer fieldRequired={required}>
      {label}
    </Bootstrap3LabelRenderer>

    {options.map((option) => (
      <div className="radio">
        <Bootstrap3LabelRenderer fieldRequired={false}>
          <input
            type="radio"
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            value={option.value}
            checked={option.selected}
            disabled={readOnly}
          />
          {option.label}
        </Bootstrap3LabelRenderer>
      </div>
    ))}
  </div>
);

export default Bootstrap3RadioListFieldRenderer;
