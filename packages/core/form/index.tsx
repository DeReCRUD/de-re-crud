import { h } from 'preact';
import { Provider } from 'redux-zero/preact';
import BaseComponent from '../base-component';
import { createStore, IStore } from '../store';
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
      errors,
      onCancel,
      onChange,
      onChangeType,
      onSubmit,
      rendererOptions,
      buttonOptions,
      struct,
      schema,
      type,
      initialValue
    } = props;

    this.store = createStore(
      schema,
      struct,
      type,
      block,
      rendererOptions,
      buttonOptions,
      collectionReferences,
      {
        errors,
        initialValue,
        onCancel,
        onChange,
        onChangeType,
        onSubmit
      }
    );
  }

  public shouldComponentUpdate(nextProps: IFormConnectProps) {
    return shallowCompare(this, nextProps);
  }

  public componentWillReceiveProps(nextProps: IFormConnectProps) {
    const allowedUpates = ['onSubmit', 'onCancel', 'onChangeType', 'onChange', 'rendererOptions'];

    if (
      !allowedUpates.every((value) => nextProps[value] === this.props[value])
    ) {
      const newState = allowedUpates.reduce((prev, curr) => {
        prev[curr] = nextProps[curr];
        return prev;
      }, {});

      this.store.setState(newState);
    }
  }

  public render() {
    return (
      <Provider store={this.store}>
        <FormConnect />
      </Provider>
    );
  }
}
