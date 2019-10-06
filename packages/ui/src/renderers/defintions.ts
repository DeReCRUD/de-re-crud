import { FunctionalComponent, ComponentConstructor } from 'preact';
import {
  IBlockContainerRenderer,
  IBooleanFieldRenderer,
  IButtonRenderer,
  IFieldContainerRenderer,
  IForeignKeyFieldRenderer,
  IInlineLinkedStructFieldRenderer,
  IMultiSelectListFieldRenderer,
  IRadioListFieldRenderer,
  ISelectListFieldRenderer,
  IStampRenderer,
  ITableLinkedStructFieldRenderer,
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
    | FunctionalComponent<IInlineLinkedStructFieldRenderer>
    | ComponentConstructor<IInlineLinkedStructFieldRenderer>;
  tableLinkedStructField:
    | FunctionalComponent<ITableLinkedStructFieldRenderer>
    | ComponentConstructor<ITableLinkedStructFieldRenderer>;
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
