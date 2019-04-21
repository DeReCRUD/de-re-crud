import { h, render } from 'preact';
import { ComponentConstructor } from '../core/models/constructors';
import BaseComponent from './base-component';
import Form from './form';
import { IFormConnectProps as IFormProps } from './form/form.props';
import { FieldValue } from './models/schema';

export { Form, FieldValue, IFormProps };

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
  ICollectionReferences,
  ICollectionReferenceParams,
  CollectionReference,
  FormType,
} from './form/form.props';

export { DeReCrudOptions } from './options';

export interface IForm {
  reEvaluateConditions: () => void;
  setValue: (path: string, value?: FieldValue) => void;
}

export function renderForm(props: IFormProps, nativeElement: Element): IForm {
  let form: Form;

  render(<Form ref={(c) => (form = c)} {...props} />, null, nativeElement);

  return {
    reEvaluateConditions: () => {
      form.reEvaluateConditions();
    },
    setValue: (path: string, value?: FieldValue) => {
      form.setValue(path, value);
    },
  };
}

export type DestroyFunc = () => void;

export type ComponentRenderer<IProps> = (
  props: Readonly<IProps>,
  nativeElement: HTMLElement,
) => DestroyFunc;

export function wrapComponent<IProps>(
  renderer: ComponentRenderer<IProps>,
): ComponentConstructor<IProps> {
  return class WrappedComponent extends BaseComponent<IProps> {
    private destroyFunc: DestroyFunc;

    public componentDidMount() {
      this.destroyFunc = renderer(this.props, this.base);
    }

    public componentDidUpdate() {
      this.destroyFunc = renderer(this.props, this.base);
    }

    public componentWillUnmount() {
      if (this.destroyFunc) {
        this.destroyFunc();
      }
    }

    public render() {
      return h('div', {});
    }
  };
}
