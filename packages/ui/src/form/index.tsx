import {
  FieldValue,
  ObjectFieldValue,
  Logger,
  formPathToValue,
} from '@de-re-crud/core';
import { Provider } from 'redux-zero/preact';
import { h, render } from '../h';
import BaseComponent from '../renderers/base-component';
import { createStore, IStore, updateStore } from '../store';
import shallowCompare from '../renderers/utils/shallow-compare';
import generateCacheKey from '../renderers/utils/generate-cache-key';
import FormConnect from './form.connect';
import { IFormConnectProps as IFormProps } from './form.props';

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
    null,
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

export default class Form extends BaseComponent<IFormProps> {
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

  public render() {
    return (
      <Provider store={this.store}>
        <FormConnect />
      </Provider>
    );
  }
}
