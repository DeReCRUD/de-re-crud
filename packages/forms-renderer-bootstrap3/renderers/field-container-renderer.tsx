import { h } from 'preact';
import { FieldContainerRendererProps } from '@de-re-crud/forms/models/renderers';
import combineCssClasses from '@de-re-crud/forms/utils/combine-css-classes';

const Bootstrap3FieldContainerRenderer = ({
  fieldDescription,
  errors,
  children
}: FieldContainerRendererProps) => (
  <div
    className={combineCssClasses(
      'form-group',
      'bootstrap3-field-container-renderer',
      errors.length && 'has-error'
    )}
  >
    {children}
    {fieldDescription &&
      !errors.length && <span className="help-block">{fieldDescription}</span>}
    {errors.map(error => (
      <span key={error} className="help-block">
        {error}
      </span>
    ))}
  </div>
);

export default Bootstrap3FieldContainerRenderer;
