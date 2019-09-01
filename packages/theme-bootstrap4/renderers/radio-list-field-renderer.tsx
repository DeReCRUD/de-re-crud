import { h } from 'preact';
import {
  IRadioListFieldRenderer,
  FieldChangeEvent,
} from '@de-re-crud/core/models/renderers';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4RadioListFieldRenderer = ({
  rendererId,
  label,
  onFocus,
  onBlur,
  onChange,
  required,
  disabled,
  readOnly,
  options,
}: IRadioListFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };

  return (
    <div className="bootstrap4-radio-list-field-renderer">
      <Bootstrap4LabelRenderer fieldRequired={required}>
        {label}
      </Bootstrap4LabelRenderer>

      {options.map((option) => {
        const inputId = `${rendererId}.${option.value}`;

        return (
          <div className="custom-control custom-radio">
            <input
              name={rendererId}
              id={inputId}
              className="custom-control-input"
              type="radio"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onManagedChange}
              value={option.value}
              checked={option.selected}
              disabled={disabled}
              readOnly={readOnly}
            />
            <Bootstrap4LabelRenderer
              htmlFor={inputId}
              className="custom-control-label"
              fieldRequired={false}
            >
              {option.label}
            </Bootstrap4LabelRenderer>
          </div>
        );
      })}
    </div>
  );
};

export default Bootstrap4RadioListFieldRenderer;
