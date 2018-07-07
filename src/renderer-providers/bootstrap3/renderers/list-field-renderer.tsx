import { h } from 'preact';
import { ListFieldRendererProps } from '../../../core/models/renderers';

const Bootstrap3ListFieldRenderer = ({
  options,
  onFocus,
  onBlur,
  onChange
}: ListFieldRendererProps) => (
  <div className="bootstrap3-list-renderer">
    <select
      className="form-control"
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default Bootstrap3ListFieldRenderer;
