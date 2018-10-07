import { Formatters } from '../form/form.props';
import { IField, ILinkedStructField, SimpleFieldType } from '../models/schema';

export default function createFieldParent(
  fields: IField[],
  parentValue: object = {},
  formatters: Formatters = {}
) {
  const value = { ...parentValue };

  assignDefaultValues(fields, value, formatters);

  return value;
}

function assignDefaultValues(
  fields: IField[],
  value: object = {},
  formatters: Formatters = {}
) {
  fields.forEach((field) => {
    const valueDefined = typeof value[field.name] !== 'undefined';

    if (field.hasOwnProperty('initialValue') && !valueDefined) {
      value[field.name] = field.initialValue;
    } else if (valueDefined && formatters[field.type]) {
      value[field.name] = formatters[field.type as SimpleFieldType].input(
        value[field.name]
      );
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
        assignDefaultValues(linkedStructChildFields, item, formatters);
      });
    }
  });
}
