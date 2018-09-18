import { IListFieldRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';
import Bootstrap4LabelRenderer from './label-renderer';

export type Bootstrap4SelectRendererProps = IListFieldRenderer & {};

const Bootstrap4SelectRenderer = ({
  label,
  multiSelect,
  options,
  onFocus,
  onBlur,
  onChange,
  required
}: Bootstrap4SelectRendererProps) => (
  <div className="bootstrap4-select-renderer">
    <Bootstrap4LabelRenderer fieldRequired={required}>
      {label}
    </Bootstrap4LabelRenderer>
    <select
      className="custom-select"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      multiple={multiSelect}
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
