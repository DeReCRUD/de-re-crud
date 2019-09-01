import {
  h,
  Ref,
  FunctionalComponent,
  ComponentChild,
  ComponentConstructor,
} from './h';
import combineCssClasses from './renderers/utils/combine-css-classes';
import createCssClass from './renderers/utils/create-css-class';
import BaseComponent from './renderers/base-component';
import { IRendererOptions } from './options/renderer-options';
import { IButtonOptions } from './options/button-options';
import Form from './form';

export * from './form';
export * from './options';
export * from './renderers';
export { h, Ref, FunctionalComponent, ComponentChild, ComponentConstructor };
export {
  Form,
  combineCssClasses,
  createCssClass,
  IRendererOptions,
  IButtonOptions,
};

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
