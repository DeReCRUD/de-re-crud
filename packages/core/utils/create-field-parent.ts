import {
  IInternalSchema,
  IInternalLinkedStructField,
} from '../internal-schema';
import { getStruct, getField } from './schema-helper';

function assignDefaultValues(
  schema: IInternalSchema,
  struct: string,
  fields: string[],
  value: object = {},
) {
  fields.forEach((fieldName) => {
    const field = getField(schema, struct, fieldName);
    const valueDefined = typeof value[field.name] !== 'undefined';

    if (typeof field.initialValue !== 'undefined' && !valueDefined) {
      value[field.name] = field.initialValue;
    }

    if (
      field.type === 'linkedStruct' &&
      Array.isArray(value[field.name]) &&
      value[field.name].length > 0
    ) {
      const linkedStructField = field as IInternalLinkedStructField;
      const { struct: referenceStruct } = linkedStructField.reference;

      const { fields: referenceFields } = schema.structs.find(
        (x) => x.name === referenceStruct,
      );

      value[field.name].forEach((item) => {
        assignDefaultValues(schema, referenceStruct, referenceFields, item);
      });
    }
  });
}

export default function createFieldParent(
  schema: IInternalSchema,
  struct: string,
  parentValue: object = {},
) {
  const value = { ...parentValue };
  const { fields } = getStruct(schema, struct);

  assignDefaultValues(schema, struct, fields, value);

  return value;
}
