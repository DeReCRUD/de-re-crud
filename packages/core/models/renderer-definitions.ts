import { ComponentConstructor, FunctionalComponent } from './constructors';
import {
  IBlockContainerRenderer,
  IBooleanFieldRenderer,
  IButtonRenderer,
  IFieldContainerRenderer,
  IFieldRenderer,
  IForeignKeyFieldRenderer,
  IInlineLinkedStructRenderer,
  IMultiSelectListFieldRenderer,
  IRadioListFieldRenderer,
  ISelectListFieldRenderer,
  IStampRenderer,
  ITableLinkedStructRenderer,
  ITextFieldRenderer,
  ITextAreaFieldRenderer,
} from '../models/renderers';

export interface IRendererDefinitions {
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
  textAreaField:
    | FunctionalComponent<ITextAreaFieldRenderer>
    | ComponentConstructor<ITextAreaFieldRenderer>;
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
    | FunctionalComponent<IBooleanFieldRenderer>
    | ComponentConstructor<IBooleanFieldRenderer>;
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
    | FunctionalComponent<IInlineLinkedStructRenderer>
    | ComponentConstructor<IInlineLinkedStructRenderer>;
  tableLinkedStructField:
    | FunctionalComponent<ITableLinkedStructRenderer>
    | ComponentConstructor<ITableLinkedStructRenderer>;
  selectListField:
    | FunctionalComponent<ISelectListFieldRenderer>
    | ComponentConstructor<ISelectListFieldRenderer>;
  multiSelectListField:
    | FunctionalComponent<IMultiSelectListFieldRenderer>
    | ComponentConstructor<IMultiSelectListFieldRenderer>;
  radioListField:
    | FunctionalComponent<IRadioListFieldRenderer>
    | ComponentConstructor<IRadioListFieldRenderer>;
  derivedField:
    | FunctionalComponent<IFieldRenderer>
    | ComponentConstructor<IFieldRenderer>;
}
