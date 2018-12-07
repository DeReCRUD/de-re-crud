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
  ISelectableOption,
  ISelectListFieldRenderer,
  ITableLinkedStructRenderer,
} from '../../models/renderers';
import {
  IField,
  IFieldReference,
  IForeignKeyField,
  ILinkedStructField,
  ILinkedStructFieldReference,
  IListField,
  SimpleFieldValue,
} from '../../models/schema';
import BlockHostRenderer from '../block-host-renderer';
import { IFieldHostRendererProps } from './field-host-renderer.props';

export default class FieldHostRenderer extends BaseComponent<
  IFieldHostRendererProps
> {
  public render() {
    const {
      errors,
      fieldPath,
      fieldReference,
      fieldValue,
      rendererId,
      rendererOptions,
    } = this.props;

    const field = fieldReference.field;

    const fieldProps: IFieldRenderer = {
      errors,
      fieldDescription: field.help,
      fieldName: field.name,
      fieldType: field.type,
      label: field.label.short,
      onBlur: this.onBlur,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onValueChange: this.onValueChange,
      placeholder: field.placeholder,
      readOnly: this.isReadOnly(fieldPath),
      rendererId,
      required: field.required,
      value: fieldValue,
    };

    const renderedField = this.renderField(fieldReference, fieldProps);
    const FieldContainerRenderer = rendererOptions.components.fieldContainer;

    return (
      <FieldContainerRenderer
        rendererId={rendererId}
        fieldName={fieldProps.fieldName}
        fieldDescription={fieldProps.fieldDescription}
        errors={fieldProps.errors}
        renderedField={renderedField}
      />
    );
  }

  private isReadOnly = (path: string) => {
    const { formLocked, readOnly } = this.props;

    if (formLocked) {
      return true;
    }

    while (path.length) {
      const index = path.indexOf('.');

      if (readOnly[path] === true) {
        return true;
      }

      if (index === -1) {
        break;
      }

      path = path.substring(index + 1);
    }

    return false;
  };

  private changeValue = (
    field: IField,
    fieldPath: string,
    value: SimpleFieldValue | SimpleFieldValue[],
  ) => {
    this.props.changeValue(field, fieldPath, value);
  };

  private onFocus = (_: FieldFocusEvent) => {
    const {
      focusField,
      fieldReference: { field },
      fieldPath,
    } = this.props;

    focusField(field, fieldPath);
  };

  private onBlur = (_: FieldBlurEvent) => {
    const {
      blurField,
      fieldReference: { field },
      fieldPath,
      parentPath,
    } = this.props;

    blurField(field, fieldPath, parentPath);
  };

  private onChange = (e: FieldChangeEvent) => {
    let value: SimpleFieldValue | SimpleFieldValue[];

    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked;
        break;
      case 'select-multiple':
        value = [];

        const { options } = e.target;
        for (const option of options) {
          if (option.selected) {
            value.push(option.value);
          }
        }
        break;
      default:
        value = e.target.value;
        break;
    }

    this.onValueChange(value);
  };

  private onValueChange = (value: SimpleFieldValue | SimpleFieldValue[]) => {
    const {
      fieldReference: { field },
      fieldPath,
    } = this.props;

    this.changeValue(field, fieldPath, value);
  };

  private onAdd = (
    index: number,
    count: number = 1,
    navigate: boolean = true,
  ) => {
    const { changeArrayValue, fieldReference, fieldPath } = this.props;
    const linkedStructField = fieldReference.field as ILinkedStructField;

    const linkedStructFieldReference = fieldReference as ILinkedStructFieldReference;
    const shouldNavigate =
      navigate && linkedStructFieldReference.hints.layout === 'table';

    changeArrayValue(
      linkedStructField,
      fieldPath,
      'add',
      index,
      count,
      shouldNavigate ? this.navigate : null,
    );
  };

  private navigate = (index: number) => {
    const { push, fieldReference, fieldPath } = this.props;
    const linkedStructField = fieldReference.field as ILinkedStructField;

    const {
      reference: { struct, block },
    } = linkedStructField;

    push({
      block: block.name,
      path: `${fieldPath}.${index}`,
      struct: struct.name,
    });
  };

  private canAdd = () => {
    const {
      fieldReference: { field },
      fieldValue,
    } = this.props;

    const linkedStructField = field as ILinkedStructField;
    const value = (fieldValue as object[]) || [];

    if (
      linkedStructField.minInstances &&
      linkedStructField.maxInstances &&
      linkedStructField.minInstances === linkedStructField.maxInstances
    ) {
      return false;
    }

    return (
      typeof linkedStructField.maxInstances === 'undefined' ||
      value.length < linkedStructField.maxInstances
    );
  };

  private canRemove = (_: number) => {
    const {
      fieldReference: { field },
      fieldValue,
    } = this.props;

    const linkedStructField = field as ILinkedStructField;
    const value = (fieldValue as object[]) || [];

    return value.length > linkedStructField.minInstances;
  };

  private onEdit = (index: number) => {
    this.navigate(index);
  };

  private onRemove = (index: number) => {
    const { changeArrayValue, fieldReference, fieldPath } = this.props;

    const linkedStructField = fieldReference.field as ILinkedStructField;

    changeArrayValue(linkedStructField, fieldPath, 'remove', index, 1);
  };

  private renderField(
    fieldReference: IFieldReference,
    fieldProps: IFieldRenderer,
  ) {
    const {
      childErrors,
      collectionReferences,
      fieldPath,
      formValue,
      parentValue,
      rendererOptions,
    } = this.props;

    const { field } = fieldReference;

    switch (field.type) {
      case 'text': {
        const TextFieldRenderer = rendererOptions.components.textField;
        return (
          <TextFieldRenderer
            {...fieldProps}
            value={fieldProps.value as string}
          />
        );
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
        return (
          <BooleanFieldRenderer
            {...fieldProps}
            value={fieldProps.value as boolean}
          />
        );
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
        let options: ISelectableOption[];

        const foreignKeyField = field as IForeignKeyField;
        const { struct, labelField } = foreignKeyField.reference;
        const keyField = struct.fields.find((x) => x.keyField);

        if (!collectionReferences || !collectionReferences[struct.name]) {
          Logger.error(
            `A collection reference must be defined for key: ${struct.name}.`,
          );
        } else {
          const collectionReference = collectionReferences[struct.name]({
            formValue,
            parentValue,
          });

          if (Array.isArray(collectionReference)) {
            options = collectionReference.map((x) => ({
              label: x[labelField.name],
              selected: x[keyField.name] === fieldProps.value,
              value: x[keyField.name],
            }));
          }
        }

        if (!options) {
          options = [];
        }

        if (typeof fieldProps.value === 'undefined') {
          options.unshift({ label: '', value: '', selected: false });
        }

        const foreignKeyFieldProps: IForeignKeyFieldRenderer = {
          ...fieldProps,
          options,
        };

        return <ForeignKeyFieldRenderer {...foreignKeyFieldProps} />;
      }
      case 'linkedStruct': {
        const { reference, minInstances } = field as ILinkedStructField;
        const { hints } = fieldReference as ILinkedStructFieldReference;
        const isTable = hints.layout === 'table';
        const block = hints.block || reference.block;

        const LinkedStructFieldRenderer = isTable
          ? rendererOptions.components.tableLinkedStructField
          : rendererOptions.components.inlineLinkedStructField;

        let values = [];

        const readOnlyValues = {};

        if (Array.isArray(fieldProps.value)) {
          values = fieldProps.value as object[];
        }

        if (values.length < minInstances) {
          const startingIndex = values.length;
          const itemsToCreate = minInstances - values.length;

          this.onAdd(startingIndex, itemsToCreate, false);
        }

        if (isTable) {
          const mappedValue: any[][] = [];

          values.forEach((value, index) => {
            mappedValue.push(
              block.fields.map(
                ({ field: blockField }) => value[blockField.name],
              ),
            );

            readOnlyValues[index] = this.isReadOnly(`${fieldPath}.${index}`);
          });

          const tableLinkedStructFieldProps: ITableLinkedStructRenderer = {
            ...fieldProps,
            canAdd: this.canAdd,
            canRemove: this.canRemove,
            headers: block.fields.map((x) => x.field.label.short),
            onAdd: () => this.onAdd((mappedValue && mappedValue.length) || 0),
            onEdit: this.onEdit,
            onRemove: this.onRemove,
            readOnlyValues,
            value: mappedValue,
            valueErrorIndicators: childErrors,
          };

          return <LinkedStructFieldRenderer {...tableLinkedStructFieldProps} />;
        } else {
          const items = values.map((_, index) => {
            const itemPath = `${fieldPath}.${index}`;

            readOnlyValues[index] = this.isReadOnly(itemPath);

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
            canAdd: this.canAdd,
            canRemove: this.canRemove,
            onAdd: () => this.onAdd((values && values.length) || 0),
            onRemove: this.onRemove,
            readOnlyRenderedItems: readOnlyValues,
            renderedItems: items,
          };

          return (
            <LinkedStructFieldRenderer {...inlineLinkedStructFieldProps} />
          );
        }
      }
      case 'list': {
        const {
          multiSelect,
          options: listOptions,
          hints: { layout },
        } = field as IListField;

        const ListFieldRenderer =
          layout === 'radio'
            ? rendererOptions.components.radioListField
            : rendererOptions.components.selectListField;

        let value;
        if (typeof fieldProps.value === 'undefined') {
          value = [];
        } else {
          value = !Array.isArray(fieldProps.value)
            ? [fieldProps.value]
            : fieldProps.value;
        }

        const options = listOptions.map((option) => ({
          ...option,
          selected: value.findIndex((x) => x === option.value) >= 0,
        }));

        if (
          layout === 'select' &&
          !multiSelect &&
          typeof fieldProps.value === 'undefined'
        ) {
          options.unshift({ label: '', value: '', selected: false });
        }

        const listFieldProps: ISelectListFieldRenderer = {
          ...fieldProps,
          multiSelect,
          options,
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
