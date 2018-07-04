import { h, Component } from 'preact';
import { IField } from '../models/schema';
import { RendererOptions } from '../models/renderer-options';
import {
  FieldRendererProps,
  FieldFocusEvent,
  FieldBlurEvent,
  FieldChangeEvent
} from '../models/renderers';
import Logger from '../logger';

export interface FieldHostRendererProps {
  field: IField;
  rendererOptions: RendererOptions;
}

export default class FieldHostRenderer extends Component<
  FieldHostRendererProps
> {
  onFocus = (e: FieldFocusEvent) => {};

  onBlur = (e: FieldBlurEvent) => {};

  onChange = (e: FieldChangeEvent) => {};

  render({ field, rendererOptions }: FieldHostRendererProps) {
    const baseProps: FieldRendererProps = {
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
        const TextField = rendererOptions.components.textField;
        return <TextField {...baseProps} />;
      }
      case 'keyword': {
        const KeywordField = rendererOptions.components.keywordField;
        return <KeywordField {...baseProps} />;
      }
      case 'integer': {
        const IntegerField = rendererOptions.components.integerField;
        return <IntegerField {...baseProps} />;
      }
      case 'estimate': {
        const EsimateField = rendererOptions.components.estimateField;
        return <EsimateField {...baseProps} />;
      }
      case 'date': {
        const DateField = rendererOptions.components.dateField;
        return <DateField {...baseProps} />;
      }
      case 'boolean': {
        const BooleanField = rendererOptions.components.booleanField;
        return <BooleanField {...baseProps} />;
      }
      case 'percent': {
        const PercentField = rendererOptions.components.percentField;
        return <PercentField {...baseProps} />;
      }
      case 'money': {
        const MoneyField = rendererOptions.components.moneyField;
        return <MoneyField {...baseProps} />;
      }
      case 'foreignKey': {
        const ForeignKeyField = rendererOptions.components.foreignKeyField;
        return <ForeignKeyField {...baseProps} />;
      }
      case 'linkedStruct': {
        const LinkedStructField = rendererOptions.components.linkedStructField;
        return <LinkedStructField {...baseProps} />;
      }
      case 'list': {
        const ListField = rendererOptions.components.listField;
        return <ListField {...baseProps} />;
      }
      case 'derived': {
        const DerivedField = rendererOptions.components.derivedField;
        return <DerivedField {...baseProps} />;
      }
      case 'stamp': {
        const StampField = rendererOptions.components.stampField;
        return <StampField {...baseProps} />;
      }
      default: {
        Logger.error(`Field type ${field.type} is not supported.`);
        return null;
      }
    }
  }
}
