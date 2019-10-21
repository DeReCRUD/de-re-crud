import { ObjectFieldValue, FieldValue } from '@de-re-crud/core';

export default function setFieldValue(
  value: object,
  path: string,
  fieldValue?: FieldValue,
) {
  if (typeof value === 'undefined') {
    value = null;
  }

  const newValue = { ...value };

  const pathArray = path.split('.');

  let currentValue: ObjectFieldValue = newValue;
  let parentValue: ObjectFieldValue;

  for (let i = 0; i < pathArray.length; i++) {
    const currentPath = pathArray[i];
    parentValue = currentValue;

    if (i === pathArray.length - 1) {
      parentValue[currentPath] = fieldValue;
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
