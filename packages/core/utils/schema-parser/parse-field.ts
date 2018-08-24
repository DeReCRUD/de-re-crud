import {
  DEFAULT_FIELD_WIDTH,
  IField,
  IIntegerField,
  ILinkedStructField,
  IListField,
  ITextField
} from '../../models/schema';
import parseLabel from './parse-label';

export default function parseField(fieldJson: any): IField {
  const result: IField = {
    hints: {
      width: DEFAULT_FIELD_WIDTH
    },
    keyField: fieldJson.keyField || false,
    label: parseLabel(fieldJson.label),
    name: fieldJson.name,
    required: fieldJson.required || false,
    type: fieldJson.type,
    unique: fieldJson.unique || false
  };

  if (typeof fieldJson.help !== 'undefined') {
    result.help = fieldJson.help;
  }

  if (typeof fieldJson.initialValue !== 'undefined') {
    result.initialValue = fieldJson.initialValue;
  }

  if (typeof fieldJson.missingValue !== 'undefined') {
    result.missingValue = fieldJson.missingValue;
  }

  if (typeof fieldJson.placeholder !== 'undefined') {
    result.placeholder = fieldJson.placeholder;
  } else {
    result.placeholder = result.label.short;
  }

  if (typeof fieldJson.hints !== 'undefined') {
    if (
      typeof fieldJson.hints.width !== 'undefined' &&
      fieldJson.hints.width >= 1 &&
      fieldJson.hints.width <= DEFAULT_FIELD_WIDTH
    ) {
      result.hints.width = fieldJson.hints.width;
    }
  }

  switch (result.type) {
    case 'text': {
      const textField = result as ITextField;

      if (fieldJson.minLength) {
        textField.minLength = fieldJson.minLength;
      }

      if (fieldJson.maxLength) {
        textField.maxLength = fieldJson.maxLength;
      }

      break;
    }
    case 'integer': {
      const integerField = result as IIntegerField;

      if (fieldJson.min) {
        integerField.min = fieldJson.min;
      }

      if (fieldJson.max) {
        integerField.max = fieldJson.max;
      }

      break;
    }
    case 'list': {
      const listField = result as IListField;
      listField.options = [];

      if (Array.isArray(fieldJson.options)) {
        fieldJson.options.forEach((option) => {
          listField.options.push({
            label: option.label,
            value: option.value
          });
        });
      }

      break;
    }
    case 'linkedStruct': {
      const linkedStructField = result as ILinkedStructField;

      if (fieldJson.minInstances) {
        linkedStructField.minInstances = fieldJson.minInstances;
      }

      if (fieldJson.maxInstances) {
        linkedStructField.maxInstances = fieldJson.maxInstances;
      }
      break;
    }
  }

  return result;
}
