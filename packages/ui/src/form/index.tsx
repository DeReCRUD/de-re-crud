import {
  FieldValue,
  Logger,
  getValueForPath,
  setValueForPath,
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
  getValue: (path?: string) => FieldValue;
  setValue: (path: string, value?: FieldValue, errors?: string[]) => void;
  setErrors: (path: string, errors: string[]) => void;
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
    getValue: (path?: string) => {
      return form.getValue(path);
    },
    setValue: (path: string, value?: FieldValue, errors?: string[]) => {
      form.setValue(path, value, errors);
    },
    setErrors: (path: string, errors: string[]) => {
      form.setErrors(path, errors);
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

  public getValue(path?: string) {
    const { value: formValue } = this.store.getState();
    const value = getValueForPath(formValue, path);

    if (Array.isArray(value)) {
      return value.concat();
    }

    if (typeof value === 'object') {
      return { ...value };
    }

    return value;
  }

  private parseErrors(path: string, errors?: string[]) {
    const externalErrors = { ...this.store.getState().errors };

    if (!errors) {
      delete externalErrors[path];
    } else {
      externalErrors[path] = errors;
    }

    return externalErrors;
  }

  public setValue(path: string, value?: FieldValue | null, errors?: string[]) {
    if (!path) {
      Logger.warning('No path set. Can not set value.');
      return;
    }

    const formValue = this.store.getState().value;
    const newFormValue = setValueForPath(formValue, path, value);

    const externalErrors = this.parseErrors(path, errors);

    this.store.setState({
      value: newFormValue,
      externalChildErrors: generateChildErrors(externalErrors),
      externalErrors,
    });
  }

  public setErrors(path: string, errors: string[]) {
    if (!path) {
      Logger.warning('No path set. Can not set value.');
      return;
    }

    const externalErrors = this.parseErrors(path, errors);

    this.store.setState({
      externalChildErrors: generateChildErrors(externalErrors),
      externalErrors,
    });
  }

  private handleSubmit = () => {
    const state = this.store.getState();
    const struct = state.schema.structs.find((x) => x.name === state.struct);
    const block = state.schema.blocks.get(state.struct).get(state.block);

    const result = validateBlock(state, struct.name, block.name, state.value);
    const { outputValue, errors, touched, hasErrors } = result;

    this.store.setState({
      externalChildErrors: generateChildErrors(errors),
      externalErrors: errors,
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
