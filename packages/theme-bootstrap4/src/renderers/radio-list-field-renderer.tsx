import { h, IRadioListFieldRenderer, FieldChangeEvent } from '@de-re-crud/ui';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4RadioListFieldRenderer = ({
  fieldPath,
  fieldName,
  renderFieldLabel,
  onFocus,
  onBlur,
  onChange,
  disabled,
  readOnly,
  tabIndex,
  options,
}: IRadioListFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };

  return (
    <div className="bootstrap4-radio-list-field-renderer">
      {renderFieldLabel()}

      {options.map((option) => {
        const inputId = `${fieldPath}.${option.value}`;

        return (
          <div className="custom-control custom-radio">
            <input
              id={inputId}
              name={fieldName}
              className="custom-control-input"
              type="radio"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onManagedChange}
              value={option.value}
              checked={option.selected}
              disabled={disabled}
              readOnly={readOnly}
              tabIndex={tabIndex}
            />
            <Bootstrap4LabelRenderer
              htmlFor={inputId}
              className=""
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
