import { h } from 'preact';
import { Provider } from 'redux-zero/preact';
import BaseComponent from '../base-component';
import Logger from '../logger';
import { FieldValue, ComplexFieldValue } from '../models/schema';
import { createStore, IStore, updateStore } from '../store';
import formPathToValue from '../utils/form-path-to-value';
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

    this.reEvaluateConditions = this.reEvaluateConditions.bind(this);
    this.setValue = this.setValue.bind(this);
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

  public reEvaluateConditions() {
    this.store.setState({
      conditionCacheKey: generateCacheKey(),
    });
  }

  public getValue(path: string) {
    if (!path) {
      Logger.warning('No path set. Can not get value.');
      return undefined;
    }

    const { value } = this.store.getState();

    return formPathToValue(value, path);
  }

  public setValue(path: string, value?: FieldValue | null) {
    if (!path) {
      Logger.warning('No path set. Can not set value.');
      return;
    }

    if (typeof value === 'undefined') {
      value = null;
    }

    const { value: formValue } = this.store.getState();
    const newFormValue = { ...formValue };

    const pathArray = path.split('.');

    let currentValue: ComplexFieldValue = newFormValue;
    let parentValue: ComplexFieldValue;

    for (let i = 0; i < pathArray.length; i++) {
      const currentPath = pathArray[i];
      parentValue = currentValue;

      if (i === pathArray.length - 1) {
        parentValue[currentPath] = value;
        break;
      }

      if (Array.isArray(currentValue)) {
        parentValue[currentPath] = currentValue.concat();
      } else if (typeof currentValue === 'object') {
        parentValue[currentPath] = { ...currentValue };
      }

      currentValue = parentValue[currentPath];
    }

    this.store.setState({
      value: newFormValue,
    });
  }

  public render() {
    return (
      <Provider store={this.store}>
        <FormConnect />
      </Provider>
    );
  }
}
