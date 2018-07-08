import { h } from 'preact';
import { TextFieldRendererProps } from '../../../core/models/renderers';
import Bootstrap3LabelRenderer from './label-renderer.component';

const Bootstrap3InputFieldRenderer = ({
  fieldType,
  label,
  value,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  minLength,
  maxLength,
  required
}: TextFieldRendererProps) => {
  let inputType;

  switch (fieldType) {
    case 'date':
      inputType = fieldType;
      break;
    case 'integer':
    case 'estimate':
    case 'percent':
      inputType = 'number';
      break;
    default:
      inputType = 'text';
      break;
  }

  return (
    <div className={`bootstrap3-${fieldType}-renderer`}>
      <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
      <input
        class="form-control"
        type={inputType}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        value={value}
      />
    </div>
  );
};

export default Bootstrap3InputFieldRenderer;
