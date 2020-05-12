import { defaults } from '@de-re-crud/core';
import NoopRenderer from './noop-renderer';
import { IRendererOptions } from '../../options/renderer-options';
import { IRendererDefinitions } from '../defintions';

export default function parseRendererOptions(
  rendererOptions?: IRendererOptions,
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
    fieldDescription: NoopRenderer as any,
    fieldErrors: NoopRenderer as any,
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
    textAreaField: NoopRenderer as any,
  };

  return defaults<IRendererDefinitions>(
    instanceRenderers,
    defaultRenderers,
    rendererOptions ? rendererOptions.renderers : undefined,
    noopRenderers,
  ) as IRendererDefinitions;
}
