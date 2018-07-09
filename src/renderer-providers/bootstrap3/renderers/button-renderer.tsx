import { h } from 'preact';
import { ButtonRendererProps } from '../../../core/models/renderers';
import combineCssClasses from '../utils/combine-css-classes';

const Bootstrap3ButtonRenderer = ({
  classes,
  text,
  onClick
}: ButtonRendererProps) => {
  const classNames = ['btn btn-default'];
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
    >
      {text}
    </button>
  );
};

export default Bootstrap3ButtonRenderer;
