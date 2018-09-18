import { IFieldContainerRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import { h } from 'preact';

const Bootstrap4FieldContainerRenderer = ({
  fieldDescription,
  errors,
  renderedField
}: IFieldContainerRenderer) => (
  <div
    className={combineCssClasses(
      'form-group',
      'bootstrap4-field-container-renderer'
    )}
  >
    {renderedField}
    {fieldDescription &&
      !errors.length && (
        <span className="form-text text-muted">{fieldDescription}</span>
      )}
    {errors.length ? (
      <span className="invalid-feedback d-block">{errors[0]}</span>
    ) : null}
  </div>
);

export default Bootstrap4FieldContainerRenderer;
