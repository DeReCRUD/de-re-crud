import { FieldValue, ObjectFieldValue } from '..';

export default function setValueForPath(
  rootValue: object,
  path: string,
  value?: FieldValue,
) {
  if (typeof value === 'undefined') {
    value = null;
  }

  const newValue = { ...rootValue };

  const pathArray = path.split('.');

  let currentValue: ObjectFieldValue = newValue;
  let parentValue: ObjectFieldValue;

  for (let i = 0; i < pathArray.length; i++) {
    const currentPath = pathArray[i];
    parentValue = currentValue;
    currentValue = currentValue[path];

    if (i === pathArray.length - 1) {
      parentValue[currentPath] = value;
      break;
    }

    if (Array.isArray(currentValue)) {
      parentValue[currentPath] = currentValue.concat();
    } else if (typeof currentValue === 'object') {
      parentValue[currentPath] = { ...currentValue };
    }

    currentValue = parentValue[currentPath];
  }

  return newValue;
}
