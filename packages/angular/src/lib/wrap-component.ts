import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  ApplicationRef,
} from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { wrapComponent, ComponentConstructor, IRenderer } from '@de-re-crud/ui';

interface IComponentCache {
  [rendererId: string]: any;
}

export interface INgRenderer<R extends IRenderer> {
  props: R;
}

export interface INgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

const cache: IComponentCache = {};

class DynamicComponentLoader<
  TRenderer extends IRenderer,
  TComponent extends INgRenderer<TRenderer>
> {
  private appRef: ApplicationRef;

  private componentFactoryResolver: ComponentFactoryResolver;

  private componentRef: ComponentRef<TComponent>;

  private portal: ComponentPortal<TComponent>;

  private portalHost: DomPortalOutlet;

  constructor(
    private injector: Injector,
    private componentConstructor: INgComponentConstructor<TComponent>,
    private onDestroy: () => void,
  ) {
    this.appRef = injector.get(ApplicationRef);
    this.componentFactoryResolver = injector.get(ComponentFactoryResolver);
  }

  initializeComponent = (element: Element) => {
    if (this.componentRef) {
      return;
    }

    this.portal = new ComponentPortal(this.componentConstructor);

    this.portalHost = new DomPortalOutlet(
      element,
      this.componentFactoryResolver,
      this.appRef,
      this.injector,
    );

    this.componentRef = this.portalHost.attach(this.portal);
  };

  updateInputs = (inputs: TRenderer) => {
    if (!this.componentRef) {
      return;
    }

    this.componentRef.instance.props = inputs;
    this.componentRef.changeDetectorRef.detectChanges();
  };

  renderComponent = (element: Element, inputs: TRenderer) => {
    this.initializeComponent(element);
    this.updateInputs(inputs);
  };

  destroyComponent = () => {
    this.onDestroy();

    if (this.portal && this.portal.isAttached) {
      this.portal.detach();
    }

    if (this.portalHost) {
      this.portalHost.dispose();
    }

    this.portal = null;
    this.portalHost = null;
    this.componentRef = null;
  };
}

export function wrapNgComponent<
  TRenderer extends IRenderer,
  TComponent extends INgRenderer<TRenderer>
>(
  injector: Injector,
  ngComponent: INgComponentConstructor<TComponent>,
): ComponentConstructor<TRenderer> {
  return wrapComponent<TRenderer>(
    (renderer: Readonly<TRenderer>, nativeElement: Element) => {
      let dynamicComponentLoader: DynamicComponentLoader<
        TRenderer,
        TComponent
      > = cache[renderer.rendererId] as DynamicComponentLoader<
        TRenderer,
        TComponent
      >;

      if (!dynamicComponentLoader) {
        dynamicComponentLoader = new DynamicComponentLoader(
          injector,
          ngComponent,
          () => {
            delete cache[renderer.rendererId];
          },
        );

        cache[renderer.rendererId] = dynamicComponentLoader;
      }

      dynamicComponentLoader.renderComponent(nativeElement, renderer);
      return dynamicComponentLoader.destroyComponent;
    },
  );
}
