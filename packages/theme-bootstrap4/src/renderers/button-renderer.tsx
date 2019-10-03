import { h, IButtonRenderer, combineCssClasses } from '@de-re-crud/ui';

const Bootstrap4ButtonRenderer = ({
  classes,
  text,
  disabled,
  onClick,
}: IButtonRenderer) => {
  const classNames = [];

  if (Array.isArray(classes)) {
    classNames.push(...classes);
  } else if (classes) {
    classNames.push(classes);
  }

  if (!classNames.length) {
    classNames.push('btn btn-secondary');
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
