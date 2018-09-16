import { IField } from '../models/schema';

export default function createFieldParent(
  fields: IField[],
  parentValue: object = {}
) {
  const value = { ...parentValue };

  fields.forEach((field) => {
    if (
      field.hasOwnProperty('initialValue') &&
      typeof value[field.name] === 'undefined'
    ) {
      value[field.name] = field.initialValue;
    }
  });

  return value;
}
