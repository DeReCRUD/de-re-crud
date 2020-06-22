import { h, IBooleanFieldRenderer, FieldChangeEvent } from '@de-re-crud/ui';

const Bootstrap4BooleanFieldRenderer = ({
  renderFieldLabel,
  fieldPath,
  fieldName,
  value,
  onFocus,
  onBlur,
  onChange,
  disabled,
  readOnly,
  tabIndex,
}: IBooleanFieldRenderer) => {
  const onManagedChange = (e: FieldChangeEvent) => {
    e.preventDefault();

    onChange(e);
  };

  return (
    <div className="bootstrap4-boolean-field-renderer custom-control custom-checkbox">
      <input
        id={fieldPath}
        name={fieldName}
        className="custom-control-input"
        type="checkbox"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onManagedChange}
        checked={value}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex}
      />
      {renderFieldLabel({ className: 'custom-control-label' })}
    </div>
  );
};

export default Bootstrap4BooleanFieldRenderer;
