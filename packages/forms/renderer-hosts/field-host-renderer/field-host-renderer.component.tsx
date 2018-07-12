import { h, Component } from 'preact';
import {
  ILinkedStructFieldReference,
  ILinkedStructField,
  IListField,
  IReferenceField,
  IFieldReference
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
import { FieldHostRendererProps } from './field-host-renderer.props';
import formPathToValue from '../../utils/form-path-to-value';

export default class FieldHostRenderer extends Component<
  FieldHostRendererProps
> {
  onFocus = (e: FieldFocusEvent) => {};

  onBlur = (e: FieldBlurEvent) => {};

  onChange = (e: FieldChangeEvent) => {
    const { fieldPath, changeValue } = this.props;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    changeValue(fieldPath, value);
  };

  onAdd = (index: number) => {
    const { changeArrayValue, push, fieldReference, fieldPath } = this.props;

    const itemPath = fieldPath + '.' + index;
    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    changeArrayValue(itemPath, 'add');

    push({
      path: itemPath,
      struct: struct.name,
      block: block.name
    });
  };

  onEdit = (index: number) => {
    const { push, fieldReference, fieldPath } = this.props;

    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    push({
      path: fieldPath + '.' + index,
      struct: struct.name,
      block: block.name
    });
  };

  onRemove = (index: number) => {
    const { changeArrayValue, fieldPath } = this.props;

    changeArrayValue(fieldPath + '.' + index, 'remove');
  };

  renderField(fieldReference: IFieldReference, fieldProps: FieldRendererProps) {
    const { rendererOptions } = this.props;
    const { field } = fieldReference;

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

        if (Array.isArray(fieldProps.value)) {
          values = fieldProps.value.map(value => {
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

  render({
    rendererOptions,
    fieldReference,
    formValue,
    fieldPath,
    parentPath,
    errors
  }: FieldHostRendererProps) {

    const field = fieldReference.field;
    const fieldValue = formPathToValue(formValue, fieldPath);

    const parentValue = parentPath
      ? formPathToValue(formValue, parentPath)
      : formValue;

    if (!fieldReference.condition(parentValue, formValue)) {
      return null;
    }

    const fieldProps: FieldRendererProps = {
      fieldName: field.name,
      fieldType: field.type,
      fieldDescription: field.help,
      value: fieldValue,
      label: field.label.short,
      placeholder: field.placeholder,
      required: field.required,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      errors: errors
    };

    const fieldRenderer = this.renderField(fieldReference, fieldProps);
    const FieldContainerRenderer = rendererOptions.components.fieldContainer;

    return (
      <FieldContainerRenderer
        fieldName={fieldProps.fieldName}
        fieldDescription={fieldProps.fieldDescription}
        errors={fieldProps.errors}
      >
        {fieldRenderer}
      </FieldContainerRenderer>
    );
  }
}
