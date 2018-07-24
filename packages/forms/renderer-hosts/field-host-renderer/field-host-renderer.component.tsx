import { h, Component } from 'preact';
import {
  ILinkedStructFieldReference,
  ILinkedStructField,
  IListField,
  IReferenceField,
  IFieldReference,
  IField,
  IOption,
  IForeignKeyField
} from '../../models/schema';
import {
  FieldRendererProps,
  FieldFocusEvent,
  FieldBlurEvent,
  FieldChangeEvent,
  TableLinkedStructRendererProps,
  ListFieldRendererProps,
  ForeignKeyFieldRendererProps,
  InlinedLinkedStructRendererProps
} from '../../models/renderers';
import formPathToValue from '../../utils/form-path-to-value';
import debounce from '../../utils/debounce';
import Logger from '../../logger';
import BlockHostRenderer from '../block-host-renderer';
import { FieldHostRendererProps } from './field-host-renderer.props';

export default class FieldHostRenderer extends Component<
  FieldHostRendererProps
> {
  debouncedChangedValue: (field: IField, fieldPath: string, value: any) => void;

  constructor(props: FieldHostRendererProps) {
    super(props);

    this.debouncedChangedValue = debounce(props.changeValue) as any;
  }

  componentWillReceiveProps(nextProps: FieldHostRendererProps) {
    if (nextProps.changeValue !== this.props.changeValue) {
      this.debouncedChangedValue = debounce(nextProps.changeValue) as any;
    }
  }

  onFocus = (e: FieldFocusEvent) => {
    const {
      focusField,
      fieldReference: { field },
      fieldPath
    } = this.props;

    focusField(field, fieldPath);
  };

  onBlur = (e: FieldBlurEvent) => {
    const {
      blurField,
      fieldReference: { field },
      fieldPath
    } = this.props;

    blurField(field, fieldPath);
  };

  onChange = (e: FieldChangeEvent) => {
    const {
      fieldReference: { field },
      fieldPath
    } = this.props;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.debouncedChangedValue(field, fieldPath, value);
  };

  onAdd = (index: number) => {
    const { changeArrayValue, push, fieldReference, fieldPath } = this.props;

    const itemPath = fieldPath + '.' + index;

    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;

    changeArrayValue(fieldReference.field, fieldPath, itemPath, 'add');

    if (linkedStructFieldReference.hints.layout === 'table') {
      push({
        path: itemPath,
        struct: struct.name,
        block: block.name
      });
    }
  };

  onEdit = (index: number) => {
    const { push, fieldReference, fieldPath } = this.props;

    const {
      reference: { struct, block }
    } = fieldReference.field as IReferenceField;

    push({
      path: `${fieldPath}.${index}`,
      struct: struct.name,
      block: block.name
    });
  };

  onRemove = (index: number) => {
    const { changeArrayValue, fieldReference, fieldPath } = this.props;

    changeArrayValue(
      fieldReference.field,
      fieldPath,
      `${fieldPath}.${index}`,
      'remove'
    );
  };

  renderField(fieldReference: IFieldReference, fieldProps: FieldRendererProps) {
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

        const foreignKeyFieldProps: ForeignKeyFieldRendererProps = {
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
            values = fieldProps.value.map(value =>
              block.fields.map(({ field }) => value[field.name])
            );
          }

          const tableLinkedStructFieldProps: TableLinkedStructRendererProps = {
            ...fieldProps,
            headers: block.fields.map(x => x.field.label.short),
            value: values,
            valueErrorIndicators: childErrors,
            onAdd: () => this.onAdd((values && values.length) || 0),
            onEdit: this.onEdit,
            onRemove: this.onRemove
          };

          return <LinkedStructFieldRenderer {...tableLinkedStructFieldProps} />;
        } else {
          if (Array.isArray(fieldProps.value)) {
            values = fieldProps.value as Array<any>;
          }

          const items = values.map((_, index) => {
            const itemPath = `${fieldPath}.${index}`;

            return (
              <BlockHostRenderer
                key={itemPath}
                struct={reference.struct}
                block={block}
                path={itemPath}
              />
            );
          });

          const inlineLinkedStructFieldProps: InlinedLinkedStructRendererProps = {
            ...fieldProps,
            renderedItems: items,
            onAdd: () => this.onAdd((values && values.length) || 0),
            onRemove: this.onRemove
          };

          return (
            <LinkedStructFieldRenderer {...inlineLinkedStructFieldProps} />
          );
        }
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
    touched,
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
      errors: touched ? errors : []
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
