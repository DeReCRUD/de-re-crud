import {
  DEFAULT_FIELD_WIDTH,
  IField,
  ILinkedStructField,
  IListField,
  IIntegerField,
  ITextField,
  IForeignKeyField,
} from '..';
import parseLabel from './parse-label';
import {
  IFieldJson,
  ITextFieldJson,
  IIntegerFieldJson,
  IListFieldJson,
  ILinkedStructFieldJson,
  IForeignKeyFieldJson,
  IDefaultValidatorMessages,
} from '../json';

export default function parseField(
  struct: string,
  fieldJson: IFieldJson,
  defaultValidatorMessages: Partial<IDefaultValidatorMessages> = {},
): IField {
  const field: IField = {
    keyField: fieldJson.keyField || false,
    deletionField: fieldJson.deletionField || false,
    label: parseLabel(fieldJson.label),
    name: fieldJson.name,
    required: fieldJson.required || false,
    struct,
    type: fieldJson.type,
    unique: fieldJson.unique || false,
    hints: {
      width: DEFAULT_FIELD_WIDTH,
      readOnly: false,
      custom: {},
    },
    customValidators: [],
    defaultValidatorMessages: fieldJson.defaultValidatorMessages || {},
  };

  if (typeof fieldJson.help !== 'undefined') {
    field.help = fieldJson.help;
  }

  if (typeof fieldJson.initialValue !== 'undefined') {
    field.initialValue = fieldJson.initialValue;
  }

  if (typeof fieldJson.missingValue !== 'undefined') {
    field.missingValue = fieldJson.missingValue;
  }

  if (typeof fieldJson.placeholder !== 'undefined') {
    field.placeholder = fieldJson.placeholder;
  } else {
    field.placeholder = field.label.short;
  }

  if (typeof fieldJson.hints !== 'undefined') {
    if (
      typeof fieldJson.hints.width !== 'undefined' &&
      fieldJson.hints.width >= 1 &&
      fieldJson.hints.width <= DEFAULT_FIELD_WIDTH
    ) {
      field.hints.width = fieldJson.hints.width;
    }

    if (typeof fieldJson.hints.readOnly !== 'undefined') {
      field.hints.readOnly = fieldJson.hints.readOnly;
    }

    if (typeof fieldJson.hints.custom !== 'undefined') {
      field.hints.custom = fieldJson.hints.custom;
    }
  }

  if (Array.isArray(fieldJson.customValidators)) {
    fieldJson.customValidators.forEach((validator) => {
      if (typeof validator === 'string') {
        field.customValidators.push(validator);
      }
    });
  }

  Object.keys(defaultValidatorMessages).forEach((key) => {
    if (typeof field.defaultValidatorMessages[key] === 'undefined') {
      field.defaultValidatorMessages[key] = defaultValidatorMessages[key];
    }
  });

  switch (field.type) {
    case 'text': {
      const textFieldJson = fieldJson as ITextFieldJson;
      const textField = field as ITextField;

      if (textFieldJson.minLength) {
        textField.minLength = textFieldJson.minLength;
      }

      if (textFieldJson.maxLength) {
        textField.maxLength = textFieldJson.maxLength;
      }

      if (
        typeof textFieldJson.hints !== 'undefined' &&
        typeof textFieldJson.hints.layout !== 'undefined'
      ) {
        textField.hints.layout = textFieldJson.hints.layout;
      } else {
        textField.hints.layout = 'input';
      }
      break;
    }
    case 'integer': {
      const integerFieldJson = fieldJson as IIntegerFieldJson;
      const integerField = field as IIntegerField;

      if (integerFieldJson.min) {
        integerField.min = integerFieldJson.min;
      }

      if (integerFieldJson.max) {
        integerField.max = integerFieldJson.max;
      }

      break;
    }
    case 'list': {
      const listFieldJson = fieldJson as IListFieldJson;
      const listField = field as IListField;

      listField.multiSelect = listFieldJson.multiSelect || false;
      listField.dynamicOptions = listFieldJson.dynamicOptions || false;
      listField.options = [];

      if (Array.isArray(listFieldJson.options)) {
        listFieldJson.options.forEach((option) => {
          listField.options.push({
            label: parseLabel(option.label),
            value: option.value,
          });
        });
      }

      if (
        !listField.multiSelect &&
        typeof listFieldJson.hints !== 'undefined' &&
        typeof listFieldJson.hints.layout !== 'undefined'
      ) {
        listField.hints.layout = listFieldJson.hints.layout;
      } else {
        listField.hints.layout = 'select';
      }

      break;
    }
    case 'linkedStruct': {
      const linkedStructFieldJson = fieldJson as ILinkedStructFieldJson;
      const linkedStructField = field as ILinkedStructField;

      linkedStructField.reference = {
        block: linkedStructFieldJson.reference.block || 'default',
        struct: linkedStructFieldJson.reference.struct,
      };

      if (linkedStructFieldJson.minInstances) {
        linkedStructField.minInstances = linkedStructFieldJson.minInstances;
      } else {
        linkedStructField.minInstances = 0;
      }

      if (linkedStructFieldJson.maxInstances) {
        linkedStructField.maxInstances = linkedStructFieldJson.maxInstances;
      }

      if (
        typeof linkedStructFieldJson.hints !== 'undefined' &&
        typeof linkedStructFieldJson.hints.layout !== 'undefined'
      ) {
        linkedStructField.hints.layout = linkedStructFieldJson.hints.layout;
      } else {
        linkedStructField.hints.layout = 'inline';
      }

      break;
    }
    case 'foreignKey': {
      const foreignKeyFieldJson = fieldJson as IForeignKeyFieldJson;
      const foreignKeyField = field as IForeignKeyField;

      foreignKeyField.reference = {
        struct: foreignKeyFieldJson.reference.struct,
        labelField: foreignKeyFieldJson.reference.labelField,
      };

      break;
    }
    default:
      break;
  }

  return field;
}
