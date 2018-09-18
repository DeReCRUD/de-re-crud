import { IButtonRenderer } from '@de-re-crud/core/models/renderers';
import combineCssClasses from '@de-re-crud/core/utils/combine-css-classes';
import { h } from 'preact';

const Bootstrap4ButtonRenderer = ({
  classes,
  text,
  disabled,
  onClick
}: IButtonRenderer) => {
  const classNames = ['btn'];
  
  if (Array.isArray(classes)) {
    classNames.push(...classes);
  } else if (classes) {
    classNames.push(classes);
  }

  if (classNames.length === 1) {
    classNames.push('btn-secondary');
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

export default Bootstrap4ButtonRenderer;
