import {
  ComponentConstructor,
  FunctionalComponent
} from '../models/constructors';
import {
  IBlockContainerRenderer,
  IButtonRenderer,
  IFieldContainerRenderer,
  IFieldRenderer,
  IForeignKeyFieldRenderer,
  IInlinedLinkedStructRenderer,
  IListFieldRenderer,
  IStampRenderer,
  ITableLinkedStructRenderer,
  ITextFieldRenderer
} from '../models/renderers';

export interface IRendererOptions {
  formClassName?: string;
  components: {
    stamp:
      | FunctionalComponent<IStampRenderer>
      | ComponentConstructor<IStampRenderer>;
    blockContainer:
      | FunctionalComponent<IBlockContainerRenderer>
      | ComponentConstructor<IBlockContainerRenderer>;
    button:
      | FunctionalComponent<IButtonRenderer>
      | ComponentConstructor<IButtonRenderer>;
    fieldContainer:
      | FunctionalComponent<IFieldContainerRenderer>
      | ComponentConstructor<IFieldContainerRenderer>;
    textField:
      | FunctionalComponent<ITextFieldRenderer>
      | ComponentConstructor<ITextFieldRenderer>;
    keywordField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    integerField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    estimateField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    dateField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    booleanField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    percentField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    moneyField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
    foreignKeyField:
      | FunctionalComponent<IForeignKeyFieldRenderer>
      | ComponentConstructor<IForeignKeyFieldRenderer>;
    inlineLinkedStructField:
      | FunctionalComponent<IInlinedLinkedStructRenderer>
      | ComponentConstructor<IInlinedLinkedStructRenderer>;
    tableLinkedStructField:
      | FunctionalComponent<ITableLinkedStructRenderer>
      | ComponentConstructor<ITableLinkedStructRenderer>;
    listField:
      | FunctionalComponent<IListFieldRenderer>
      | ComponentConstructor<IListFieldRenderer>;
    derivedField:
      | FunctionalComponent<IFieldRenderer>
      | ComponentConstructor<IFieldRenderer>;
  };
}
