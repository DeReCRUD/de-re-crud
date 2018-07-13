import { h, Component } from 'preact';
import { Provider } from 'redux-zero/preact';
import Store from 'redux-zero/interfaces/Store';
import shallowCompare from '../utils/shallow-compare';
import { createStore } from '../store';
import { FormConnectProps } from './form.props';
import FormConnect from './form.connect';

export default class Form extends Component<FormConnectProps> {
  store: Store;

  constructor(props: FormConnectProps) {
    super(props);

    const {
      schema,
      struct,
      block,
      errors,
      value,
      onSubmit,
      onChange,
      onChangeType
    } = props;

    this.store = createStore(schema, struct, block, {
      errors,
      value,
      onSubmit,
      onChange,
      onChangeType
    });
  }

  shouldComponentUpdate(nextProps: FormConnectProps) {
    return shallowCompare(this, nextProps);
  }

  componentWillReceiveProps(nextProps: FormConnectProps) {
    const allowedUpates = ['onSubmit', 'onChangeType', 'onChange'];

    if (!allowedUpates.every((value) => nextProps[value] === this.props[value])) {
      const newState = allowedUpates.reduce((prev, curr) => {
        return prev[curr];
      }, {});  

      this.store.setState(newState);
    }
  }

  render({ schema, ...otherProps }: FormConnectProps) {
    return (
      <Provider store={this.store}>
        <FormConnect schema={schema} {...otherProps} />
      </Provider>
    );
  }
}
