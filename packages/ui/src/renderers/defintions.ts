import { FunctionalComponent, ComponentConstructor } from '../h';
import {
  IBlockContainerRenderer,
  IBooleanFieldRenderer,
  IButtonRenderer,
  IFieldContainerRenderer,
  IForeignKeyFieldRenderer,
  IInlineLinkedStructRenderer,
  IMultiSelectListFieldRenderer,
  IRadioListFieldRenderer,
  ISelectListFieldRenderer,
  IStampRenderer,
  ITableLinkedStructRenderer,
  ITextFieldRenderer,
  ITextAreaFieldRenderer,
  IIntegerFieldRenderer,
  IPercentFieldRenderer,
  IMoneyFieldRenderer,
  IDerivedFieldRenderer,
  IDateFieldRenderer,
  IEstimateFieldRenderer,
  IKeywordFieldRenderer,
} from '.';

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
    | FunctionalComponent<IKeywordFieldRenderer>
    | ComponentConstructor<IKeywordFieldRenderer>;
  integerField:
    | FunctionalComponent<IIntegerFieldRenderer>
    | ComponentConstructor<IIntegerFieldRenderer>;
  estimateField:
    | FunctionalComponent<IEstimateFieldRenderer>
    | ComponentConstructor<IEstimateFieldRenderer>;
  dateField:
    | FunctionalComponent<IDateFieldRenderer>
    | ComponentConstructor<IDateFieldRenderer>;
  booleanField:
    | FunctionalComponent<IBooleanFieldRenderer>
    | ComponentConstructor<IBooleanFieldRenderer>;
  percentField:
    | FunctionalComponent<IPercentFieldRenderer>
    | ComponentConstructor<IPercentFieldRenderer>;
  moneyField:
    | FunctionalComponent<IMoneyFieldRenderer>
    | ComponentConstructor<IMoneyFieldRenderer>;
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
    | FunctionalComponent<IDerivedFieldRenderer>
    | ComponentConstructor<IDerivedFieldRenderer>;
}
