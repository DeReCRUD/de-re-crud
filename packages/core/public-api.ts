import { ComponentConstructor, h, render } from "preact";
import Form from "./form";
import { IFormConnectProps as IFormProps } from "./form/form.props";

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
} from "./form/form.props";

export { DeReCrudOptions } from "./options";

export function renderForm(
  formComponent: ComponentConstructor<IFormProps>,
  props: IFormProps,
  nativeElement: Element
) {
  const preactElement = h(formComponent, props);

  render(preactElement, nativeElement);
}
