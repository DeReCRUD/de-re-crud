import { IFieldContainerRenderer } from "@de-re-crud/forms/models/renderers";
import { combineCssClasses } from "@de-re-crud/forms/utils";
import { h } from "preact";

const Bootstrap3FieldContainerRenderer = ({
  fieldDescription,
  errors,
  children
}: IFieldContainerRenderer) => (
  <div
    className={combineCssClasses(
      "form-group",
      "bootstrap3-field-container-renderer",
      errors.length && "has-error"
    )}
  >
    {children}
    {fieldDescription &&
      !errors.length && <span className="help-block">{fieldDescription}</span>}
    {errors.length ? <span className="help-block">{errors[0]}</span> : null}
  </div>
);

export default Bootstrap3FieldContainerRenderer;
