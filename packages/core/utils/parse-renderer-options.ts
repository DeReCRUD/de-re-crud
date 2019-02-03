import { IRendererDefinitions } from '../models/renderer-definitions';
import { IRendererOptions } from '../models/renderer-options';
import defaults from './defaults';
import NoopRenderer from './noop-renderer';

export default function parseRendererOptions(
  rendererOptions: IRendererOptions,
  instanceRenderers: Partial<IRendererDefinitions> = {},
  defaultRenderers: Partial<IRendererDefinitions> = {},
): IRendererDefinitions {
  const noopRenderers: IRendererDefinitions = {
    blockContainer: NoopRenderer as any,
    booleanField: NoopRenderer as any,
    button: NoopRenderer as any,
    dateField: NoopRenderer as any,
    derivedField: NoopRenderer as any,
    estimateField: NoopRenderer as any,
    fieldContainer: NoopRenderer as any,
    foreignKeyField: NoopRenderer as any,
    inlineLinkedStructField: NoopRenderer as any,
    integerField: NoopRenderer as any,
    keywordField: NoopRenderer as any,
    moneyField: NoopRenderer as any,
    percentField: NoopRenderer as any,
    radioListField: NoopRenderer as any,
    selectListField: NoopRenderer as any,
    multiSelectListField: NoopRenderer as any,
    stamp: NoopRenderer as any,
    tableLinkedStructField: NoopRenderer as any,
    textField: NoopRenderer as any,
  };

  return defaults<IRendererDefinitions>(
    instanceRenderers,
    defaultRenderers,
    rendererOptions.renderers,
    noopRenderers,
  ) as IRendererDefinitions;
}
