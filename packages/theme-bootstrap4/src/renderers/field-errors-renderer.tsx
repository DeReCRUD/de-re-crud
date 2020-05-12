import { h, IFieldErrorsRenderer } from '@de-re-crud/ui';

const Bootstrap4FieldErrorsRenderer = ({ errors }: IFieldErrorsRenderer) => {
  return (
    <span data-testid="field-error" className="invalid-feedback d-block">
      {errors[0]}
    </span>
  );
};

export default Bootstrap4FieldErrorsRenderer;
