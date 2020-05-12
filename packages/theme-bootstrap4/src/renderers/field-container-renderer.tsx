import { h, IFieldContainerRenderer, combineCssClasses } from '@de-re-crud/ui';

const Bootstrap4FieldContainerRenderer = ({
  renderedField,
  renderedDescription,
  renderedErrors,
}: IFieldContainerRenderer) => (
  <div
    className={combineCssClasses(
      'form-group',
      'bootstrap4-field-container-renderer',
    )}
  >
    {renderedField}
    {renderedDescription}
    {renderedErrors}
  </div>
);

export default Bootstrap4FieldContainerRenderer;
