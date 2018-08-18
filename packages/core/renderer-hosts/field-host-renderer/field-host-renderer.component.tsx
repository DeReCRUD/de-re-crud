import { h } from 'preact';
import BaseComponent from '../../base-component';
import Logger from '../../logger';
import {
  FieldBlurEvent,
  FieldChangeEvent,
  FieldFocusEvent,
  IFieldRenderer,
  IForeignKeyFieldRenderer,
  IInlinedLinkedStructRenderer,
  IListFieldRenderer,
  ITableLinkedStructRenderer
} from '../../models/renderers';
import {
  IField,
  IFieldReference,
  IForeignKeyField,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IListField,
  IOption,
  IReferenceField
} from '../../models/schema';
import debounce from '../../utils/debounce';
import BlockHostRenderer from '../block-host-renderer';
import { IFieldHostRendererProps } from './field-host-renderer.props';

export default class FieldHostRenderer extends BaseComponent<
  IFieldHostRendererProps
> {
  private debouncedChangedValue: (
    field: IField,
    fieldPath: string,
    value: any
  ) => void;

  constructor(props: IFieldHostRendererProps) {
    super(props);

    this.debouncedChangedValue = debounce(props.changeValue) as any;
  }

  public componentWillReceiveProps(nextProps: IFieldHostRendererProps) {
    if (nextProps.changeValue !== this.props.changeValue) {
      this.debouncedChangedValue = debounce(nextProps.changeValue) as any;
    }
  }

  public render() {
    const {
      errors,
      fieldReference,
      fieldValue,
      rendererId,
      rendererOptions,
      touched
    } = this.props;

    const field = fieldReference.field;

    const fieldProps: IFieldRenderer = {
      errors: touched ? errors : [],
      fieldDescription: field.help,
      fieldName: field.name,
      fieldType: field.type,
      label: field.label.short,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      placeholder: field.placeholder,
      rendererId,
      required: field.required,
      value: fieldValue
    };

    const fieldRenderer = this.renderField(fieldReference, fieldProps);
    const FieldContainerRenderer = rendererOptions.components.fieldContainer;

    return (
      <FieldContainerRenderer
        rendererId={rendererId}
        fieldName={fieldProps.fieldName}
        fieldDescription={fieldProps.fieldDescription}
        errors={fieldProps.errors}
      >
        {fieldRenderer}
      </FieldContainerRenderer>
    );
  }

  private onFocus = (_: FieldFocusEvent) => {
    const {
      focusField,
      fieldReference: { field },
      fieldPath
    } = this.props;

    focusField(field, fieldPath);
  };

  private onBlur = (_: FieldBlurEvent) => {
    const {
      blurField,
      fieldReference: { field },
      fieldPath
    } = this.props;

    blurField(field, fieldPath);
  };

  private onChange = (e: FieldChangeEvent) => {
    const {
      fieldReference: { field },
      fieldPath
    } = this.props;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.debouncedChangedValue(field, fieldPath, value);
  };

  private onAdd = (index: number) => {
    const { changeArrayValue, push, fieldReference, fieldPath } = this.props;

    const itemPath = fieldPath + '.' + index;

    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;

    changeArrayValue(fieldReference.field, fieldPath, itemPath, 'add');

    if (linkedStructFieldReference.hints.layout === 'table') {
      push({
        block: block.name,
        path: itemPath,
        struct: struct.name
      });
    }
  };

  private onEdit = (index: number) => {
    const { push, fieldReference, fieldPath } = this.props;

    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    push({
      block: block.name,
      path: `${fieldPath}.${index}`,
      struct: struct.name
    });
  };

  private onRemove = (index: number) => {
    const { changeArrayValue, fieldReference, fieldPath } = this.props;

    changeArrayValue(
      fieldReference.field,
      fieldPath,
      `${fieldPath}.${index}`,
      'remove'
    );
  };

  private renderField(
    fieldReference: IFieldReference,
    fieldProps: IFieldRenderer
  ) {
    const {
      fieldPath,
      rendererOptions,
      childErrors,
      collectionReferences,
      formValue
    } = this.props;
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
        const options: IOption[] = [];

        const foreignKeyField = field as IForeignKeyField;
        const struct = foreignKeyField.reference.struct.name;

        if (!collectionReferences || !collectionReferences[field.name]) {
          Logger.error(
            `A collection reference must be defined for key: ${struct}.`
          );
        } else {
          options.push(...collectionReferences[struct](formValue));
        }

        const foreignKeyFieldProps: IForeignKeyFieldRenderer = {
          ...fieldProps,
          options
        };

        return <ForeignKeyFieldRenderer {...foreignKeyFieldProps} />;
      }
      case 'linkedStruct': {
        const { reference } = field as ILinkedStructField;
        const { hints } = fieldReference as ILinkedStructFieldReference;
        const isTable = hints.layout === 'table';
        const block = hints.block || reference.block;

        const LinkedStructFieldRenderer = isTable
          ? rendererOptions.components.tableLinkedStructField
          : rendererOptions.components.inlineLinkedStructField;

        let values = [];

        if (isTable) {
          if (Array.isArray(fieldProps.value)) {
            values = fieldProps.value.map((value) =>
              block.fields.map(
                ({ field: blockField }) => value[blockField.name]
              )
            );
          }

          const tableLinkedStructFieldProps: ITableLinkedStructRenderer = {
            ...fieldProps,
            headers: block.fields.map((x) => x.field.label.short),
            onAdd: () => this.onAdd((values && values.length) || 0),
            onEdit: this.onEdit,
            onRemove: this.onRemove,
            value: values,
            valueErrorIndicators: childErrors
          };

          return <LinkedStructFieldRenderer {...tableLinkedStructFieldProps} />;
        } else {
          if (Array.isArray(fieldProps.value)) {
            values = fieldProps.value as any[];
          }

          const items = values.map((_, index) => {
            const itemPath = `${fieldPath}.${index}`;

            return (
              <BlockHostRenderer
                key={itemPath}
                struct={reference.struct.name}
                block={block}
                path={itemPath}
              />
            );
          });

          const inlineLinkedStructFieldProps: IInlinedLinkedStructRenderer = {
            ...fieldProps,
            onAdd: () => this.onAdd((values && values.length) || 0),
            onRemove: this.onRemove,
            renderedItems: items
          };

          return (
            <LinkedStructFieldRenderer {...inlineLinkedStructFieldProps} />
          );
        }
      }
      case 'list': {
        const { options } = field as IListField;
        const ListFieldRenderer = rendererOptions.components.listField;

        const listFieldProps: IListFieldRenderer = {
          ...fieldProps,
          options
        };

        return <ListFieldRenderer {...listFieldProps} />;
      }
      case 'derived': {
        const DerivedFieldRenderer = rendererOptions.components.derivedField;
        return <DerivedFieldRenderer {...fieldProps} />;
      }
      default: {
        Logger.error(`Field type ${field.type} is not supported.`);
        return null;
      }
    }
  }
}
