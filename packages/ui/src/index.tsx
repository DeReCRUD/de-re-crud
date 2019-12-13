import {
  h,
  Ref,
  FunctionalComponent,
  ComponentChild,
  ComponentConstructor,
} from 'preact';
import combineCssClasses from './renderers/utils/combine-css-classes';
import createCssClass from './renderers/utils/create-css-class';
import BaseComponent from './renderers/base-component';
import { IRendererOptions } from './options/renderer-options';
import { IButtonOptions } from './options/button-options';
import { IRendererDefinitions } from './renderers/defintions';

export { default as CollectionForm } from './collection-form';
export * from './collection-form';
export { default as Form } from './form';
export * from './form';
export * from './options';
export * from './renderers';
export { h, Ref, FunctionalComponent, ComponentChild, ComponentConstructor };

export {
  combineCssClasses,
  createCssClass,
  IRendererOptions,
  IButtonOptions,
  IRendererDefinitions,
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
      this.destroyFunc = renderer(this.props, this.base as HTMLElement);
    }

    public componentDidUpdate() {
      this.destroyFunc = renderer(this.props, this.base as HTMLElement);
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
