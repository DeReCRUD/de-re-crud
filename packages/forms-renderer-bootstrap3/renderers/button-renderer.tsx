import { h } from "preact";
import { ButtonRendererProps } from "@de-re-crud/forms/models/renderers";
import combineCssClasses from "@de-re-crud/forms/utils/combine-css-classes";

const Bootstrap3ButtonRenderer = ({
  classes,
  text,
  disabled,
  onClick
}: ButtonRendererProps) => {
  const classNames = ["btn btn-default"];
  if (Array.isArray(classes)) {
    classNames.push(...classes);
  } else if (classes) {
    classNames.push(classes);
  }

  return (
    <button
      className={combineCssClasses(...classNames)}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Bootstrap3ButtonRenderer;
