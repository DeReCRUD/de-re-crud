import { h, ISelectListFieldRenderer, combineCssClasses } from '@de-re-crud/ui';

export type Bootstrap4SelectRendererProps = ISelectListFieldRenderer & {
  multiSelect?: boolean;
};

const Bootstrap4SelectRenderer = ({
  renderFieldLabel,
  rendererId,
  errors,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required,
  disabled,
  readOnly,
  tabIndex,
}: Bootstrap4SelectRendererProps) => (
  <div className="bootstrap4-select-renderer">
    {renderFieldLabel()}
    <select
      id={rendererId}
      className={combineCssClasses(
        'custom-select',
        errors.length && 'is-invalid',
      )}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      multiple={multiSelect}
      required={required}
      disabled={disabled}
      readOnly={readOnly}
      tabIndex={tabIndex}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.selected}
        >
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Bootstrap4SelectRenderer;
