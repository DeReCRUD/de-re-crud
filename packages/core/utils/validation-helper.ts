import { ICollectionReferences } from '../form/form.props';
import {
  IInternalSchema,
  IInternalIntegerField,
  IInternalTextField,
  IInternalLinkedStructField,
  IInternalField,
} from '../schema/internal-schema';
import {
  defaultValidators,
  defaultValidatorFuncs,
  defaultValidatorMessages,
} from '../validators/default-validators';
import PatternValidator from '../validators/pattern-validator';
import { getKeyFields } from './schema-helper';
import { FieldValue, ICustomValidator } from '../schema';

function validateKeywordField(_: IInternalField, value: string): string[] {
  const errors = [];

  if (value) {
    if (/\s/g.test(value)) {
      errors.push('This field can not contain any tabs or spaces.');
    }
  }

  return errors;
}

function validateTextField(field: IInternalTextField, value: string): string[] {
  const errors = [];

  if (value) {
    if (field.minLength && value.length < field.minLength) {
      errors.push(
        `This field must have at least ${field.minLength} character(s).`,
      );
    } else if (field.maxLength && value.length > field.maxLength) {
      errors.push(
        `This field can not have more than ${field.maxLength} character(s).`,
      );
    }
  }

  return errors;
}

function validateIntegerField(
  field: IInternalIntegerField,
  value: number,
): string[] {
  const errors = [];

  if (value) {
    if (typeof field.min !== 'undefined' && value < field.min) {
      errors.push(`This field must have a value of at least ${field.min}.`);
    } else if (typeof field.max !== 'undefined' && value > field.max) {
      errors.push(`This field can not exceed the value of ${field.max}.`);
    }
  }

  return errors;
}

export function validateLinkedStructField(
  field: IInternalLinkedStructField,
  value: object[],
) {
  const errors = [];

  if (
    (field.required || field.minInstances) &&
    (!value || !value.length || value.length < field.minInstances)
  ) {
    errors.push(
      `This field must have at least ${field.minInstances || 1} item(s).`,
    );
  } else if (field.maxInstances && value.length > field.maxInstances) {
    errors.push(
      `This field can not have more than ${field.maxInstances} item(s).`,
    );
  }

  return errors;
}

export function validateField(
  schema: IInternalSchema,
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
      errors.push(defaultValidatorMessages[validator]);
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
        const keyFields = getKeyFields(schema, structName);
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
          errors.push('This field must be unique.');
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
        field as IInternalIntegerField,
        fieldValue as number,
      );
      break;
    case 'text':
      fieldTypeErrors = validateTextField(
        field as IInternalTextField,
        fieldValue as string,
      );
      break;
    case 'linkedStruct':
      fieldTypeErrors = validateLinkedStructField(
        field as IInternalLinkedStructField,
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
