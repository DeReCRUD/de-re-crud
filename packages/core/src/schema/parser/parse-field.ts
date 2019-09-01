import {
  DEFAULT_FIELD_WIDTH,
  IInternalField,
  IInternalLinkedStructField,
  IInternalListField,
  IInternalIntegerField,
  IInternalTextField,
  IInternalForeignKeyField,
} from '../internal';
import parseLabel from './parse-label';
import {
  IField,
  ITextField,
  IIntegerField,
  IListField,
  ILinkedStructField,
  IForeignKeyField,
} from '..';

export default function parseField(
  struct: string,
  field: IField,
): IInternalField {
  const result: IInternalField = {
    keyField: field.keyField || false,
    label: parseLabel(field.label),
    name: field.name,
    required: field.required || false,
    struct,
    type: field.type,
    unique: field.unique || false,
    hints: {
      width: DEFAULT_FIELD_WIDTH,
      readOnly: false,
      custom: {},
    },
    customValidators: [],
  };

  if (typeof field.help !== 'undefined') {
    result.help = field.help;
  }

  if (typeof field.initialValue !== 'undefined') {
    result.initialValue = field.initialValue;
  }

  if (typeof field.missingValue !== 'undefined') {
    result.missingValue = field.missingValue;
  }

  if (typeof field.placeholder !== 'undefined') {
    result.placeholder = field.placeholder;
  } else {
    result.placeholder = result.label.short;
  }

  if (typeof field.hints !== 'undefined') {
    if (
      typeof field.hints.width !== 'undefined' &&
      field.hints.width >= 1 &&
      field.hints.width <= DEFAULT_FIELD_WIDTH
    ) {
      result.hints.width = field.hints.width;
    }

    if (typeof field.hints.readOnly !== 'undefined') {
      result.hints.readOnly = field.hints.readOnly;
    }

    if (typeof field.hints.custom !== 'undefined') {
      result.hints.custom = field.hints.custom;
    }
  }

  if (Array.isArray(field.customValidators)) {
    field.customValidators.forEach((validator) => {
      if (typeof validator === 'string') {
        result.customValidators.push(validator);
      }
    });
  }

  switch (result.type) {
    case 'text': {
      const textField = field as ITextField;
      const internalTextField = result as IInternalTextField;

      if (textField.minLength) {
        internalTextField.minLength = textField.minLength;
      }

      if (textField.maxLength) {
        internalTextField.maxLength = textField.maxLength;
      }

      if (
        typeof textField.hints !== 'undefined' &&
        typeof textField.hints.layout !== 'undefined'
      ) {
        internalTextField.hints.layout = textField.hints.layout;
      } else {
        internalTextField.hints.layout = 'input';
      }
      break;
    }
    case 'integer': {
      const integerField = field as IIntegerField;
      const internalIntegerField = result as IInternalIntegerField;

      if (integerField.min) {
        internalIntegerField.min = integerField.min;
      }

      if (integerField.max) {
        internalIntegerField.max = integerField.max;
      }

      break;
    }
    case 'list': {
      const listField = field as IListField;
      const internalListField = result as IInternalListField;

      internalListField.multiSelect = listField.multiSelect || false;
      internalListField.dynamicOptions = listField.dynamicOptions || false;
      internalListField.options = [];

      if (Array.isArray(listField.options)) {
        listField.options.forEach((option) => {
          internalListField.options.push({
            label: parseLabel(option.label),
            value: option.value,
          });
        });
      }

      if (
        !internalListField.multiSelect &&
        typeof listField.hints !== 'undefined' &&
        typeof listField.hints.layout !== 'undefined'
      ) {
        internalListField.hints.layout = listField.hints.layout;
      } else {
        internalListField.hints.layout = 'select';
      }

      break;
    }
    case 'linkedStruct': {
      const linkedStructField = field as ILinkedStructField;
      const internalLinkedStructField = result as IInternalLinkedStructField;

      internalLinkedStructField.reference = {
        block: linkedStructField.reference.block || 'default',
        struct: linkedStructField.reference.struct,
      };

      if (linkedStructField.minInstances) {
        internalLinkedStructField.minInstances = linkedStructField.minInstances;
      } else {
        internalLinkedStructField.minInstances = 0;
      }

      if (linkedStructField.maxInstances) {
        internalLinkedStructField.maxInstances = linkedStructField.maxInstances;
      }

      break;
    }
    case 'foreignKey': {
      const foreignKeyField = field as IForeignKeyField;
      const linkedForeignKeyField = result as IInternalForeignKeyField;

      linkedForeignKeyField.reference = {
        struct: foreignKeyField.reference.struct,
        labelField: foreignKeyField.reference.labelField,
      };

      break;
    }
    default:
      break;
  }

  return result;
}
