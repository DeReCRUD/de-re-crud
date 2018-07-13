import {
  IField,
  ITextField,
  IIntegerField,
  ILinkedStructField
} from '@de-re-crud/forms/models/schema';

export function validateField(field: IField, value?: any): string[] {
  const errors = [];

  if (!value && field.required && field.type !== 'linkedStruct') {
    errors.push('This field is required.');
  }

  let fieldTypeErrors;

  switch (field.type) {
    case 'keyword':
      fieldTypeErrors = validateKeywordField(field, value);
      break;
    case 'text':
      fieldTypeErrors = validateTextField(field as ITextField, value);
      break;
    case 'linkedStruct':
      fieldTypeErrors = validateLinkedStructField(
        field as ILinkedStructField,
        value
      );
      break;
    default:
      fieldTypeErrors = [];
  }

  errors.push(...fieldTypeErrors);

  return errors;
}

function validateKeywordField(field: IField, value?: string): string[] {
  const errors = [];

  if (value) {
    if (/\s/g.test(value)) {
      errors.push('This field can not contain any tabs or spaces.');
    }
  }

  return errors;
}

function validateTextField(field: ITextField, value?: string): string[] {
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

function validateInteferField(field: IIntegerField, value?: number): string[] {
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

function validateLinkedStructField(field: ILinkedStructField, value?: any[]) {
  const errors = [];
  
  if ((!value || !value.length) && field.required) {
    errors.push('This field must have at least 1 item.');
  } else {
    if (field.minInstances && value.length < field.minInstances) {
      errors.push(
        `This field must have at least ${field.minInstances} item(s).`
      );
    } else if (field.maxInstances && value.length > field.maxInstances) {
      errors.push(
        `This field can not have more than ${field.maxInstances} item(s).`
      );
    }
  }

  return errors;
}
