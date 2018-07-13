import { h, Component } from 'preact';
import { Provider } from 'redux-zero/preact';
import Store from 'redux-zero/interfaces/Store';
import { createStore } from '../store';
import { FormConnectProps } from './form.props';
import FormConnect from './form.connect';

export default class Form extends Component<FormConnectProps> {
  store: Store;

  constructor(props: FormConnectProps) {
    super(props);

    const { schema, struct, block, errors, value, onSubmit } = props;

    this.store = createStore(schema, struct, block, {
      errors,
      value,
      onSubmit
    });
  }

  shouldComponentUpdate(nextProps: FormConnectProps) {
    return nextProps.onSubmit !== this.props.onSubmit;
  }

  componentWillReceiveProps(nextProps: FormConnectProps) {
    if (nextProps.onSubmit !== this.props.onSubmit) {
      this.store.setState({
        onSubmit: nextProps.onSubmit
      });
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
