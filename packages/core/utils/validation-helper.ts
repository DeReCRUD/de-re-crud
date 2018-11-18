import { ICollectionReferences } from '../form/form.props';
import {
  FieldValue,
  IField,
  IIntegerField,
  ILinkedStructField,
  IStruct,
  ITextField
} from '../models/schema';

export function validateField(
  struct: IStruct,
  field: IField,
  fieldValue: FieldValue,
  initialFieldValue: FieldValue,
  formValue: object,
  parentValue: object,
  collectionReferences: ICollectionReferences = {}
): string[] {
  const errors = [];

  if (field.type !== 'linkedStruct') {
    if (
      (typeof fieldValue === 'undefined' ||
        fieldValue === null ||
        fieldValue === '') &&
      field.required
    ) {
      errors.unshift('This field is required.');
    }

    if (
      (field.unique || field.keyField) &&
      fieldValue !== initialFieldValue &&
      collectionReferences[field.struct]
    ) {
      const references = collectionReferences[field.struct]({
        formValue,
        parentValue
      });

      if (Array.isArray(references)) {
        const keyFields = struct.fields.filter((x) => x.keyField);
        let sameInstanceFound = false;

        const uniqueError = references.find((reference) => {
          if (!sameInstanceFound) {
            const sameInstances = keyFields.filter((keyField) => {
              return reference[keyField.name] === parentValue[keyField.name];
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
        field as IIntegerField,
        fieldValue as number
      );
      break;
    case 'text':
      fieldTypeErrors = validateTextField(
        field as ITextField,
        fieldValue as string
      );
      break;
    case 'linkedStruct':
      fieldTypeErrors = validateLinkedStructField(
        field as ILinkedStructField,
        fieldValue as object[]
      );
      break;
    default:
      fieldTypeErrors = [];
  }

  errors.push(...fieldTypeErrors);

  return errors;
}

function validateKeywordField(_: IField, value: string): string[] {
  const errors = [];

  if (value) {
    if (/\s/g.test(value)) {
      errors.push('This field can not contain any tabs or spaces.');
    }
  }

  return errors;
}

function validateTextField(field: ITextField, value: string): string[] {
  const errors = [];

  if (value) {
    if (field.minLength && value.length < field.minLength) {
      errors.push(
        `This field must have at least ${field.minLength} character(s).`
      );
    } else if (field.maxLength && value.length > field.maxLength) {
      errors.push(
        `This field can not have more than ${field.maxLength} character(s).`
      );
    }
  }

  return errors;
}

function validateIntegerField(field: IIntegerField, value: number): string[] {
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
  field: ILinkedStructField,
  value: object[]
) {
  const errors = [];

  if (
    (field.required || field.minInstances) &&
    (!value || !value.length || value.length < field.minInstances)
  ) {
    errors.push(
      `This field must have at least ${field.minInstances || 1} item(s).`
    );
  } else if (field.maxInstances && value.length > field.maxInstances) {
    errors.push(
      `This field can not have more than ${field.maxInstances} item(s).`
    );
  }

  return errors;
}
