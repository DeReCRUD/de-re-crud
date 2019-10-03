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
import { ICustomValidator, IDefaultValidatorMessages } from '../schema/json';
import { defaultValidatorFuncs } from '../validators/default-validators';
import PatternValidator from '../validators/pattern-validator';
import formPathToValue from './form-path-to-value';

const defaultValidatorMessages: IDefaultValidatorMessages = {
  keyword: 'This field can not contain any tabs or spaces.',
  minLength: 'This field must have at least {minLength} character(s).',
  maxLength: 'This field can not have more than {maxLength} character(s).',
  min: 'This field must have a value of at least {min}.',
  max: 'This field can not exceed the value of {max}.',
  minInstances: 'This field must have at least {minInstances,1} item(s).',
  maxInstances: 'This field can not have more than {maxInstances} item(s).',
  unique: 'This field must be unique.',
  required: 'This field is required.',
};

function interpolateMessage(
  messageType: keyof IDefaultValidatorMessages,
  field: IField,
) {
  const messageFormat =
    field.defaultValidatorMessages[messageType] ||
    defaultValidatorMessages[messageType];

  return messageFormat.replace(/({[a-zA-Z0-9,.]*})/gm, (match) => {
    const key = match.replace(/[{}]/g, '');
    const parts = key.split(',');

    const propValue = formPathToValue(field, parts[0]);
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
      errors.push(interpolateMessage('keyword', field));
    }
  }

  return errors;
}

function validateTextField(field: ITextField, value: string): string[] {
  const errors = [];

  if (value) {
    if (field.minLength && value.length < field.minLength) {
      errors.push(interpolateMessage('minLength', field));
    } else if (field.maxLength && value.length > field.maxLength) {
      errors.push(interpolateMessage('maxLength', field));
    }
  }

  return errors;
}

function validateIntegerField(field: IIntegerField, value: number): string[] {
  const errors = [];

  if (value) {
    if (typeof field.min !== 'undefined' && value < field.min) {
      errors.push(interpolateMessage('min', field));
    } else if (typeof field.max !== 'undefined' && value > field.max) {
      errors.push(interpolateMessage('max', field));
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
    errors.push(interpolateMessage('minInstances', field));
  } else if (field.maxInstances && value.length > field.maxInstances) {
    errors.push(interpolateMessage('maxInstances', field));
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

  Object.keys(defaultValidatorFuncs).forEach((key) => {
    const validatorFn = defaultValidatorFuncs[key];
    const valid = validatorFn(field, fieldValue);
    if (!valid) {
      errors.push(
        interpolateMessage(key as keyof IDefaultValidatorMessages, field),
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
          errors.push(interpolateMessage('unique', field));
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
