import {
  h,
  Ref,
  FunctionalComponent,
  ComponentChild,
  ComponentConstructor,
  render,
} from './h';
import BaseComponent from './renderers/base-component';
import Form from './form';

export * from './form';
export * from './options';
export { h, Ref, FunctionalComponent, ComponentChild, ComponentConstructor };
export { Form };

export type DestroyFunc = () => void;

export type ComponentRenderer<IProps> = (
  props: Readonly<IProps>,
  nativeElement: HTMLElement,
) => DestroyFunc;

export function renderElement(element: JSX.Element, nativeElement: Element) {
  render(element, null, nativeElement);
}

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
