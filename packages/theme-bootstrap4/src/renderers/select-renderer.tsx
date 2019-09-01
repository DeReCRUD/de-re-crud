import { h, ISelectListFieldRenderer, combineCssClasses } from '@de-re-crud/ui';
import Bootstrap4LabelRenderer from './label-renderer';

export type Bootstrap4SelectRendererProps = ISelectListFieldRenderer & {
  multiSelect?: boolean;
};

const Bootstrap4SelectRenderer = ({
  label,
  errors,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required,
  disabled,
  readOnly,
}: Bootstrap4SelectRendererProps) => (
  <div className="bootstrap4-select-renderer">
    <Bootstrap4LabelRenderer fieldRequired={required}>
      {label}
    </Bootstrap4LabelRenderer>
    <select
      className={combineCssClasses(
        'custom-select',
        errors.length && 'is-invalid',
      )}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      multiple={multiSelect}
      readOnly={readOnly}
      required={required}
      disabled={disabled}
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
