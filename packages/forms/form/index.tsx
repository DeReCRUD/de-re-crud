import { Component, h } from "preact";
import Store from "redux-zero/interfaces/Store";
import { Provider } from "redux-zero/preact";
import { createStore } from "../store";
import shallowCompare from "../utils/shallow-compare";
import FormConnect from "./form.connect";
import { IFormConnectProps } from "./form.props";

export default class Form extends Component<IFormConnectProps> {
  private store: Store;

  constructor(props: IFormConnectProps) {
    super(props);

    const {
      block,
      collectionReferences,
      errors,
      onChange,
      onChangeType,
      onSubmit,
      rendererOptions,
      struct,
      schema,
      value
    } = props;

    this.store = createStore(
      schema,
      struct,
      block,
      rendererOptions,
      collectionReferences,
      {
        errors,
        onChange,
        onChangeType,
        onSubmit,
        value
      }
    );
  }

  public shouldComponentUpdate(nextProps: IFormConnectProps) {
    return shallowCompare(this, nextProps);
  }

  public componentWillReceiveProps(nextProps: IFormConnectProps) {
    const allowedUpates = ["onSubmit", "onChangeType", "onChange"];

    if (
      !allowedUpates.every((value) => nextProps[value] === this.props[value])
    ) {
      const newState = allowedUpates.reduce((prev, curr) => {
        return prev[curr];
      }, {});

      this.store.setState(newState);
    }
  }

  public render({ schema, ...otherProps }: IFormConnectProps) {
    return (
      <Provider store={this.store}>
        <FormConnect schema={schema} {...otherProps} />
      </Provider>
    );
  }
}
