import { h, combineCssClasses, IFieldLabelRenderer } from '@de-re-crud/ui';
import Bootstrap4LabelRenderer from './label-renderer';

const Bootstrap4FieldLabelRenderer = ({
  className,
  label,
  fieldPath,
  fieldRequired,
}: IFieldLabelRenderer) => (
  <Bootstrap4LabelRenderer
    className={combineCssClasses('bootstrap4-label-renderer', className)}
    htmlFor={fieldPath}
    fieldRequired={fieldRequired}
  >
    {label}
  </Bootstrap4LabelRenderer>
);

export default Bootstrap4FieldLabelRenderer;
