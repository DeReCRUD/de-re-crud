import { ComponentConstructor, h, render } from "preact";
import Form from "./form";
import { IFormConnectProps as IForm } from "./form/form.props";

export { Form };
export { IForm };

export {
  FormSubmission,
  FormSubmissionCallback,
  FormChangeNotification,
  FormChangeNotificationType,
  ICollectionReferences,
  CollectionReference
} from "./form/form.props";

export { DeReCrudOptions } from "./options";
export { default as BaseComponent} from "@de-re-crud/core/base-component";

export function renderForm(
  formComponent: ComponentConstructor<IForm>,
  props: IForm,
  nativeElement: Element
) {
  const preactElement = h(formComponent, props);

  render(preactElement, nativeElement);
}
