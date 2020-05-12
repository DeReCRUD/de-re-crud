import { h, IFieldDescriptionRenderer } from '@de-re-crud/ui';

const Bootstrap4FieldDescriptionRenderer = ({
  hasErrors,
  fieldDescription,
}: IFieldDescriptionRenderer) => {
  if (hasErrors) {
    return null;
  }

  return <span className="form-text text-muted">{fieldDescription}</span>;
};

export default Bootstrap4FieldDescriptionRenderer;
