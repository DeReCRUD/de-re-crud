import {
  ISchema,
  IIntegerField,
  ITextField,
  ILinkedStructField,
  IField,
  FieldValue,
  ICollectionReferences,
} from '../schema';
import InternalSchemaHelper from '../schema/helper';
import { ICustomValidator } from '../schema/json';
import {
  defaultValidators,
  defaultValidatorFuncs,
  defaultValidatorMessages,
} from '../validators/default-validators';
import PatternValidator from '../validators/pattern-validator';

const messages = {
  keyword: 'This field can not contain any tabs or spaces.',
  minLength: 'This field must have at least {minLength} character(s).',
  maxLength: 'This field can not have more than {maxLength} character(s).',
  min: 'This field must have a value of at least {min}.',
  max: 'This field can not exceed the value of {max}.',
  minInstances: 'This field must have at least {minInstances,1} item(s).',
  maxInstances: 'This field can not have more than {maxInstances} item(s).',
  unique: 'This field must be unique.',
};

function interpolateMessage(messageFormat: string, field: IField) {
  return messageFormat.replace(/({[a-zA-Z0-9,]*})/gm, (match) => {
    const key = match.replace(/[{}]/g, '');
    const parts = key.split(',');

    const propValue = field[parts[0]];
    if (parts.length === 2) {
      if (!propValue) {
        return parts[1];
      }

      return propValue;
    }

    return typeof propValue !== 'undefined' ? propValue : match;
  });
}

function validateKeywordField(field: IField, value: string): string[] {
  const errors = [];

  if (value) {
    if (/\s/g.test(value)) {
      errors.push(interpolateMessage(messages.keyword, field));
    }
  }

  return errors;
}

function validateTextField(field: ITextField, value: string): string[] {
  const errors = [];

  if (value) {
    if (field.minLength && value.length < field.minLength) {
      errors.push(interpolateMessage(messages.minLength, field));
    } else if (field.maxLength && value.length > field.maxLength) {
      errors.push(interpolateMessage(messages.maxLength, field));
    }
  }

  return errors;
}

function validateIntegerField(field: IIntegerField, value: number): string[] {
  const errors = [];

  if (value) {
    if (typeof field.min !== 'undefined' && value < field.min) {
      errors.push(interpolateMessage(messages.min, field));
    } else if (typeof field.max !== 'undefined' && value > field.max) {
      errors.push(interpolateMessage(messages.max, field));
    }
  }

  return errors;
}

export function validateLinkedStructField(
  field: ILinkedStructField,
  value: object[],
) {
  const errors = [];

  if (
    (field.required || field.minInstances) &&
    (!value || !value.length || value.length < field.minInstances)
  ) {
    errors.push(interpolateMessage(messages.minInstances, field));
  } else if (field.maxInstances && value.length > field.maxInstances) {
    errors.push(interpolateMessage(messages.maxInstances, field));
  }

  return errors;
}

export function validateField(
  schema: ISchema,
  structName: string,
  fieldName: string,
  fieldValue: FieldValue,
  initialFieldValue: FieldValue,
  formValue: object,
  parentValue: object,
  customValidators: ICustomValidator[],
  collectionReferences: ICollectionReferences = {},
): string[] {
  const errors = [];
  const field = schema.fields.get(structName).get(fieldName);

  defaultValidators.forEach((validator) => {
    const valid = defaultValidatorFuncs[validator](field, fieldValue);
    if (!valid) {
      errors.push(
        interpolateMessage(defaultValidatorMessages[validator], field),
      );
    }
  });

  if (field.type !== 'linkedStruct') {
    if (
      (field.unique || field.keyField) &&
      fieldValue !== initialFieldValue &&
      collectionReferences[field.struct]
    ) {
      const references = collectionReferences[field.struct]({
        formValue,
        parentValue,
      });

      if (Array.isArray(references)) {
        const keyFields = InternalSchemaHelper.getKeyFields(schema, structName);
        let sameInstanceFound = false;

        const uniqueError = references.find((reference) => {
          if (!sameInstanceFound) {
            const sameInstances = keyFields.filter((keyField) => {
              return reference[keyField] === parentValue[keyField];
            });

            if (sameInstances.length) {
              sameInstanceFound = true;
            }

            if (sameInstances.length > 1) {
              return true;
            }

            if (sameInstances.length === 1) {
              return false;
            }
          }

          return reference[field.name] === fieldValue;
        });

        if (uniqueError) {
          errors.push(interpolateMessage(messages.unique, field));
        }
      }
    }
  }

  let fieldTypeErrors;

  switch (field.type) {
    case 'keyword':
      fieldTypeErrors = validateKeywordField(field, fieldValue as string);
      break;
    case 'integer':
      fieldTypeErrors = validateIntegerField(
        field as IIntegerField,
        fieldValue as number,
      );
      break;
    case 'text':
      fieldTypeErrors = validateTextField(
        field as ITextField,
        fieldValue as string,
      );
      break;
    case 'linkedStruct':
      fieldTypeErrors = validateLinkedStructField(
        field as ILinkedStructField,
        fieldValue as object[],
      );
      break;
    default:
      fieldTypeErrors = [];
  }

  errors.push(...fieldTypeErrors);

  customValidators.forEach((validator) => {
    const patternValidator = new PatternValidator(
      validator.name,
      validator.pattern,
      validator.negate,
    );

    if (!patternValidator.validate(field, fieldValue)) {
      errors.push(validator.message);
    }
  });

  return errors;
}
