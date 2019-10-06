import {
  FieldValue,
  ObjectFieldValue,
  Logger,
  formPathToValue,
  generateChildErrors,
} from '@de-re-crud/core';
import { Provider } from 'redux-zero/preact';
import { h, render } from 'preact';
import BaseComponent from '../renderers/base-component';
import { createStore, IStore, updateStore } from '../store';
import shallowCompare from '../renderers/utils/shallow-compare';
import generateCacheKey from '../renderers/utils/generate-cache-key';
import FormConnect from './form.connect';
import { IFormConnectProps as IFormProps } from './form.props';
import { FormContext } from './form.context';
import { validateBlock } from './form.actions';

export {
  FormSubmission,
  FormSubmissionCallback,
  FieldChangeNotification,
  FieldChangeNotificationType,
  FieldChangeNotificationCallback,
  IFieldChangeNotificationParams,
  FieldParentChangeNotification,
  FieldParentChangeNotificationCallback,
  IFieldParentChangeNotificationParams,
  IFieldChangeNotificationCallbackParams,
  FormType,
} from './form.props';

export { IFormProps };

export interface IForm {
  reEvaluateConditions: () => void;
  setValue: (path: string, value?: FieldValue) => void;
}

export function renderForm(props: IFormProps, nativeElement: Element): IForm {
  let form: Form;

  render(
    <Form
      ref={(c) => {
        form = c;
      }}
      {...props}
    />,
    nativeElement,
  );

  return {
    reEvaluateConditions: () => {
      form.reEvaluateConditions();
    },
    setValue: (path: string, value?: FieldValue) => {
      form.setValue(path, value);
    },
  };
}

interface IFormState {
  submitting: boolean;
}

export default class Form extends BaseComponent<IFormProps, IFormState> {
  private store: IStore;

  constructor(props: IFormProps) {
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

    this.state = { submitting: false };

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

  public shouldComponentUpdate(nextProps: IFormProps) {
    return shallowCompare(this, nextProps);
  }

  public componentWillReceiveProps(nextProps: IFormProps) {
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

    let currentValue: ObjectFieldValue = newFormValue;
    let parentValue: ObjectFieldValue;

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

  private handleSubmit = () => {
    const state = this.store.getState();
    const struct = state.schema.structs.find((x) => x.name === state.struct);
    const block = state.schema.blocks.get(state.struct).get(state.block);

    const result = validateBlock(state, struct.name, block.name, state.value);
    const { outputValue, errors, touched, hasErrors } = result;

    this.store.setState({
      childErrors: generateChildErrors(errors),
      errors,
      touched,
    });

    if (hasErrors) {
      return;
    }

    this.setState({ submitting: true });

    state.onSubmit(outputValue, (submissionErrors) => {
      if (submissionErrors) {
        this.store.setState({
          externalChildErrors: generateChildErrors(submissionErrors),
          externalErrors: submissionErrors,
        });
      } else {
        this.store.setState({
          externalChildErrors: {},
          externalErrors: {},
        });
      }

      this.setState({ submitting: false });
    });
  };

  public render() {
    const { submitting } = this.state;

    return (
      <Provider store={this.store}>
        <FormContext.Provider value={{ submit: this.handleSubmit, submitting }}>
          <FormConnect />
        </FormContext.Provider>
      </Provider>
    );
  }
}
