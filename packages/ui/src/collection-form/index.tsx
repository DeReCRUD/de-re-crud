import { h, FunctionalComponent } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import {
  ICollectionReferences,
  ISchemaJson,
  InternalSchemaHelper,
} from '@de-re-crud/core';
import { Provider } from 'redux-zero/preact';
import { createStore, IStore } from '../store';
import { IButtonOptions, IRendererDefinitions, IRendererOptions } from '..';

export interface ICollectionFormProps {
  schema: ISchemaJson;
  struct: string;
  block?: string;
  collectionReferences?: ICollectionReferences;
  rendererOptions?: IRendererOptions;
  renderers?: Partial<IRendererDefinitions>;
  buttonOptions?: IButtonOptions;
  initialValue?: object[];
}

const DEFAULT_BOOLEAN_MAP: { [index: number]: boolean } = {};

const CollectionForm: FunctionalComponent<{ store: IStore }> = ({ store }) => {
  const state = store.getState();

  const CollectionRenderer = state.renderers.tableLinkedStructField;
  const struct = InternalSchemaHelper.getStruct(state.schema, state.struct);
  const block = InternalSchemaHelper.getBlock(
    state.schema,
    state.struct,
    state.block,
  );

  const rows = useMemo(
    () => {
      return (state.value as any).root.map((value) => {
        return block.fields.map(({ field: blockField }) => value[blockField]);
      });
    },
    [state.value, block],
  );

  const headers = useMemo(
    () => {
      return block.fields.map((blockField) => {
        const field = InternalSchemaHelper.getField(
          state.schema,
          state.struct,
          blockField.field,
        );

        return field.label.short;
      });
    },
    [state.schema, state.struct, block.fields],
  );

  return (
    <CollectionRenderer
      formId={state.formId}
      rendererId={state.formId}
      fieldType="linkedStruct"
      fieldDescription=""
      fieldName="root"
      fieldPath="root"
      tabIndex={-1}
      headers={headers}
      value={rows}
      label={struct.collectionLabel.short}
      placeholder=""
      disabledValues={DEFAULT_BOOLEAN_MAP}
      busyValues={DEFAULT_BOOLEAN_MAP}
      valueErrorIndicators={DEFAULT_BOOLEAN_MAP}
      required={false}
      readOnly={false}
      disabled={false}
      busy={false}
      canAdd={() => true}
      canRemove={() => true}
      errors={[]}
      minInstances={0}
      hints={{}}
      onAdd={() => {}}
      onEdit={() => {}}
      onRemove={() => {}}
      onBlur={() => {}}
      onChange={() => {}}
      onFocus={() => {}}
      onValueChange={() => {}}
      renderChildField={() => null}
      renderFieldLabel={() => null}
    />
  );
};

const CollectionFormWrapper: FunctionalComponent<ICollectionFormProps> = (
  props,
) => {
  const {
    schema,
    struct,
    block,
    rendererOptions,
    renderers,
    buttonOptions,
    collectionReferences,
    initialValue,
  } = props;

  const [store, setStore] = useState<IStore | undefined>(undefined);

  const [formValue] = useState<{ root: object[] }>({
    root: initialValue || [],
  });

  useEffect(() => {
    const newStore = createStore(
      schema,
      struct,
      'create',
      block,
      false,
      rendererOptions,
      renderers,
      buttonOptions,
      collectionReferences,
      undefined,
      formValue,
      () => {},
    );

    setStore(newStore);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  if (!store) {
    return null;
  }

  return (
    <Provider store={store}>
      <CollectionForm store={store} />
    </Provider>
  );
};

export default CollectionFormWrapper;
