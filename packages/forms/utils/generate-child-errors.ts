import { Errors, ChildErrors } from '../store';

export default function generateChildErrors(errors: Errors): ChildErrors {
  const childErrors = {};

  if (!errors) {
    return childErrors;
  }

  Object.keys(errors).forEach((key) => {
    if (!errors[key].length) {
      return;
    }

    let pathArray = key.split('.');
    pathArray = pathArray.slice(0, pathArray.length - 1);

    while (pathArray.length >= 2) {
      const parentPath = pathArray.slice(0, pathArray.length - 1).join('.');
      const index = pathArray[pathArray.length - 1];

      childErrors[parentPath] = {
        ...childErrors[parentPath],
        [index]: true
      };

      pathArray.pop();
    }
  });

  return childErrors;
}
