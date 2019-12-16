import {
  FieldValue,
  Logger,
  getValueForPath,
  setValueForPath,
  generateChildErrors,
} from '@de-re-crud/core';
import { h, render } from 'preact';
import BaseComponent from '../renderers/base-component';
import { createStore, IStore, removeStore, updateStore } from '../store';
import shallowCompare from '../renderers/utils/shallow-compare';
import generateCacheKey from '../renderers/utils/generate-cache-key';
import FormConnect from './form.connect';
import { IFormConnectProps as IFormProps } from './form.props';
import FormProvider from './provider';

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

export interface IJsxElement {
  destroy: () => void;
}

export interface IForm extends IJsxElement {
  reEvaluateConditions: () => void;
  getValue: (path?: string) => FieldValue;
  setValue: (path: string, value?: FieldValue, errors?: string[]) => void;
  setErrors: (path: string, errors: string[]) => void;
}

export function renderElement(
  formId: string,
  element: h.JSX.Element | h.JSX.Element[],
  nativeElement: Element,
): IJsxElement {
  render(<FormProvider formId={formId}>{element}</FormProvider>, nativeElement);

  return {
    destroy: () => {
      render(null, nativeElement);
    },
  };
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
    destroy: () => {
      render(null, nativeElement);
    },
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
      this.store.getState().formId,
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

  public componentWillUnmount(): void {
    removeStore(this.store.getState().formId);
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

  public render() {
    return (
      <FormProvider formId={this.store.getState().formId}>
        <FormConnect />
      </FormProvider>
    );
  }
}
