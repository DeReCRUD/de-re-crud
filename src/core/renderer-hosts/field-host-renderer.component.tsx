import { h, Component } from 'preact';
import { IFieldReference, ILinkedStructFieldReference } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';
import {
  FieldRendererProps,
  FieldFocusEvent,
  FieldBlurEvent,
  FieldChangeEvent,
  LinkedStructRendererProps
} from '../models/renderers';
import Logger from '../logger';

export interface FieldHostRendererProps {
  fieldReference: IFieldReference;
  rendererOptions: RendererOptions;
}

export default class FieldHostRenderer extends Component<
  FieldHostRendererProps
> {
  onFocus = (e: FieldFocusEvent) => {};

  onBlur = (e: FieldBlurEvent) => {};

  onChange = (e: FieldChangeEvent) => {};

  onAdd = () => {};

  onEdit = () => {};

  onRemove = () => {};

  render({ fieldReference, rendererOptions }: FieldHostRendererProps) {
    const field = fieldReference.field;

    const fieldProps: FieldRendererProps = {
      fieldName: field.name,
      fieldType: field.type,
      label: field.label.short,
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
        const linkedStructField = fieldReference as ILinkedStructFieldReference;
        const LinkedStructFieldRenderer =
          linkedStructField.hints.layout === 'table'
            ? rendererOptions.components.tableLinkedStructField
            : rendererOptions.components.inlineLinkedStructField;

        const linkedStructFieldProps: LinkedStructRendererProps = {
          ...fieldProps,
          onAdd: this.onAdd,
          onEdit: this.onEdit,
          onRemove: this.onRemove
        };

        return <LinkedStructFieldRenderer {...linkedStructFieldProps} />;
      }
      case 'list': {
        const ListFieldRenderer = rendererOptions.components.listField;
        return <ListFieldRenderer {...fieldProps} />;
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
