import { IField, ILinkedStructField } from '../models/schema';

export default function createFieldParent(
  fields: IField[],
  parentValue: object = {}
) {
  const value = { ...parentValue };

  assignDefaultValues(fields, value);

  return value;
}

function assignDefaultValues(fields: IField[], value: object = {}) {
  fields.forEach((field) => {
    const valueDefined = typeof value[field.name] !== 'undefined';

    if (field.hasOwnProperty('initialValue') && !valueDefined) {
      value[field.name] = field.initialValue;
    }

    if (
      field.type === 'linkedStruct' &&
      Array.isArray(value[field.name]) &&
      value[field.name].length > 0
    ) {
      const linkedStructField = field as ILinkedStructField;
      const {
        fields: linkedStructChildFields
      } = linkedStructField.reference.struct;

      value[field.name].forEach((item) => {
        assignDefaultValues(linkedStructChildFields, item);
      });
    }
  });
}
