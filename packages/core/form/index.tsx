import { h } from 'preact';
import { Provider } from 'redux-zero/preact';
import BaseComponent from '../base-component';
import { createStore, IStore, updateStore } from '../store';
import generateCacheKey from '../utils/generate-cache-key';
import shallowCompare from '../utils/shallow-compare';
import FormConnect from './form.connect';
import { IFormConnectProps } from './form.props';

export default class Form extends BaseComponent<IFormConnectProps> {
  private store: IStore;

  constructor(props: IFormConnectProps) {
    super(props);

    const {
      block,
      collectionReferences,
      disabled,
      initialErrors,
      onCancel,
      onFieldChange,
      onFieldChangeInputTimeout,
      onFieldChangeType,
      onFieldParentChange,
      onSubmit,
      renderers,
      rendererOptions,
      buttonOptions,
      struct,
      schema,
      type,
      initialValue,
    } = props;

    this.store = createStore(
      schema,
      struct,
      type,
      block,
      disabled,
      rendererOptions,
      renderers,
      buttonOptions,
      collectionReferences,
      initialErrors,
      initialValue,
      onSubmit,
      onCancel,
      onFieldChange,
      onFieldChangeInputTimeout,
      onFieldChangeType,
      onFieldParentChange,
    );
  }

  public shouldComponentUpdate(nextProps: IFormConnectProps) {
    return shallowCompare(this, nextProps);
  }

  public componentWillReceiveProps(nextProps: IFormConnectProps) {
    updateStore(
      this.store,
      nextProps.disabled,
      nextProps.rendererOptions,
      nextProps.renderers,
      nextProps.buttonOptions,
      nextProps.collectionReferences,
      nextProps.onSubmit,
      nextProps.onCancel,
      nextProps.onFieldChange,
      nextProps.onFieldChangeInputTimeout,
      nextProps.onFieldChangeType,
      nextProps.onFieldParentChange,
    );
  }

  public reEvaluateConditions = () => {
    this.store.setState({
      conditionCacheKey: generateCacheKey(),
    });
  };

  public render() {
    return (
      <Provider store={this.store}>
        <FormConnect />
      </Provider>
    );
  }
}
