import {
  IRadioListFieldRenderer,
  FieldChangeEvent,
} from '@de-re-crud/core/models/renderers';
import Bootstrap3LabelRenderer from '@de-re-crud/renderer-bootstrap3/renderers/label-renderer';
import { h } from 'preact';

const Bootstrap3RadioListFieldRenderer = ({
  rendererId,
  label,
  onFocus,
  onBlur,
  onChange,
  required,
  readOnly,
  options,
}: IRadioListFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };
  return (
    <div className="bootstrap3-radio-list-field-renderer">
      <Bootstrap3LabelRenderer fieldRequired={required}>
        {label}
      </Bootstrap3LabelRenderer>

      {options.map((option) => (
        <div className="radio">
          <Bootstrap3LabelRenderer fieldRequired={false}>
            <input
              name={rendererId}
              type="radio"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onManagedChange}
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
};

export default Bootstrap3RadioListFieldRenderer;
