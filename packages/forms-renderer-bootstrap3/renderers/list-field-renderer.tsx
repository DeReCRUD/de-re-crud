import { h } from 'preact';
import { ListFieldRendererProps } from '@de-re-crud/forms/models/renderers';
import Bootstrap3LabelRenderer from './label-renderer.component';

const Bootstrap3ListFieldRenderer = ({
  label,
  value,
  options,
  onFocus,
  onBlur,
  onChange,
  required
}: ListFieldRendererProps) => (
  <div className="bootstrap3-list-renderer">
    <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
    <select
      className="form-control"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Bootstrap3ListFieldRenderer;
