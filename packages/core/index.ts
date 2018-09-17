import { h, render } from 'preact';
import { ComponentConstructor } from '../core/models/constructors';
import BaseComponent from './base-component';
import Form from './form';
import { IFormConnectProps as IFormProps } from './form/form.props';

export { Form };

export {
  IFormProps,
  FormSubmission,
  FormSubmissionCallback,
  FormChangeNotification,
  FormChangeNotificationType,
  IFormChangeNotificationParams,
  ICollectionReferences,
  CollectionReference
} from './form/form.props';

export { DeReCrudOptions } from './options';

export function renderForm(
  formComponent: ComponentConstructor<IFormProps>,
  props: IFormProps,
  nativeElement: Element
) {
  const preactElement = h(formComponent, props);

  render(preactElement, null, nativeElement);
}

export type DestroyFunc = () => void;

export type ComponentRenderer<IProps> = (
  props: Readonly<IProps>,
  nativeElement: Element
) => DestroyFunc;

export function wrapComponent<IProps>(
  renderer: ComponentRenderer<IProps>
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
