import { h, Component } from 'preact';
import {
  ILinkedStructFieldReference,
  ILinkedStructField,
  IListField
} from '../../models/schema';
import {
  FieldRendererProps,
  FieldFocusEvent,
  FieldBlurEvent,
  FieldChangeEvent,
  LinkedStructRendererProps,
  ListFieldRendererProps
} from '../../models/renderers';
import Logger from '../../logger';
import {
  FieldHostRendererProps,
  FieldHostRendererChildProps
} from './field-host-renderer.props';
import formPathToValue from '../../utils/form-path-to-value';

export default class FieldHostRenderer extends Component<
  FieldHostRendererProps
> {
  getFieldPath = () => {
    const childProps = this.props as FieldHostRendererChildProps;
    const fieldPath = childProps.path
      ? childProps.path
      : this.props.fieldReference.field.name;
    return fieldPath;
  };

  onFocus = (e: FieldFocusEvent) => {};

  onBlur = (e: FieldBlurEvent) => {};

  onChange = (e: FieldChangeEvent) => {
    const fieldPath = this.getFieldPath();
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.props.changeValue(fieldPath, value);
  };

  onAdd = (index: number) => {
    const fieldPath = this.getFieldPath();

    this.props.changeArrayValue(fieldPath + '.' + index, 'add');
  };

  onEdit = (index: number) => {
  };

  onRemove = (index: number) => {
    const fieldPath = this.getFieldPath();

    this.props.changeArrayValue(fieldPath + '.' + index, 'remove');
  };

  render(props: FieldHostRendererProps) {
    const { fieldReference, rendererOptions, formValue } = props;

    const childProps = props as FieldHostRendererChildProps;
    const field = fieldReference.field;

    const fieldPath = this.getFieldPath();
    const fieldValue = formPathToValue(formValue, fieldPath);

    const parentValue = childProps.parentPath
      ? formPathToValue(formValue, childProps.parentPath)
      : formValue;

    if (!fieldReference.condition(parentValue, formValue)) {
      return null;
    }

    const fieldProps: FieldRendererProps = {
      fieldName: field.name,
      fieldType: field.type,
      value: fieldValue,
      label: field.label.short,
      placeholder: field.placeholder,
      required: field.required,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange
    };

    switch (field.type) {
      case 'text': {
        const TextFieldRenderer = rendererOptions.components.textField;
        return <TextFieldRenderer {...fieldProps} />;
      }
      case 'keyword': {
        const KeywordFieldRenderer = rendererOptions.components.keywordField;
        return <KeywordFieldRenderer {...fieldProps} />;
      }
      case 'integer': {
        const IntegerFieldRenderer = rendererOptions.components.integerField;
        return <IntegerFieldRenderer {...fieldProps} />;
      }
      case 'estimate': {
        const EsimateFieldRenderer = rendererOptions.components.estimateField;
        return <EsimateFieldRenderer {...fieldProps} />;
      }
      case 'date': {
        const DateFieldRenderer = rendererOptions.components.dateField;
        return <DateFieldRenderer {...fieldProps} />;
      }
      case 'boolean': {
        const BooleanFieldRenderer = rendererOptions.components.booleanField;
        return <BooleanFieldRenderer {...fieldProps} />;
      }
      case 'percent': {
        const PercentFieldRenderer = rendererOptions.components.percentField;
        return <PercentFieldRenderer {...fieldProps} />;
      }
      case 'money': {
        const MoneyFieldRenderer = rendererOptions.components.moneyField;
        return <MoneyFieldRenderer {...fieldProps} />;
      }
      case 'foreignKey': {
        const ForeignKeyFieldRenderer =
          rendererOptions.components.foreignKeyField;
        return <ForeignKeyFieldRenderer {...fieldProps} />;
      }
      case 'linkedStruct': {
        const { reference } = field as ILinkedStructField;
        const { hints } = fieldReference as ILinkedStructFieldReference;
        const LinkedStructFieldRenderer =
          hints.layout === 'table'
            ? rendererOptions.components.tableLinkedStructField
            : rendererOptions.components.inlineLinkedStructField;

        const block = hints.block || reference.block;
        let values = null;

        if (Array.isArray(fieldValue)) {
          values = fieldValue.map((value) => {
            return block.fields.map(({ field }) => value[field.name]);
          });
        }

        const linkedStructFieldProps: LinkedStructRendererProps = {
          ...fieldProps,
          headers: block.fields.map(x => x.field.label.short),
          value: values,
          onAdd: () => this.onAdd((values && values.length) || 0),
          onEdit: this.onEdit,
          onRemove: this.onRemove
        };

        return <LinkedStructFieldRenderer {...linkedStructFieldProps} />;
      }
      case 'list': {
        const { options } = field as IListField;
        const ListFieldRenderer = rendererOptions.components.listField;

        const listFieldProps: ListFieldRendererProps = {
          ...fieldProps,
          options
        };

        return <ListFieldRenderer {...listFieldProps} />;
      }
      case 'derived': {
        const DerivedFieldRenderer = rendererOptions.components.derivedField;
        return <DerivedFieldRenderer {...fieldProps} />;
      }
      case 'stamp': {
        const StampFieldRenderer = rendererOptions.components.stampField;
        return <StampFieldRenderer {...fieldProps} />;
      }
      default: {
        Logger.error(`Field type ${field.type} is not supported.`);
        return null;
      }
    }
  }
}
