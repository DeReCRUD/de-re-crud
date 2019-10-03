import {
  Component,
  Injector,
  ComponentFactoryResolver,
  ComponentRef,
  ApplicationRef,
} from '@angular/core';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { wrapComponent, ComponentConstructor, IRenderer } from '@de-re-crud/ui';

interface IComponentCache {
  [rendererId: string]: any;
}

export interface INgComponentConstructor<P> {
  new (...params: any[]): P & Component;
}

const cache: IComponentCache = {};

class DynamicComponentLoader<TComponent> {
  private appRef: ApplicationRef;

  private componentFactoryResolver: ComponentFactoryResolver;

  private componentRef: ComponentRef<TComponent>;

  private portal: ComponentPortal<TComponent>;

  private portalHost: DomPortalHost;

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

    this.portalHost = new DomPortalHost(
      element,
      this.componentFactoryResolver,
      this.appRef,
      this.injector,
    );

    this.componentRef = this.portalHost.attach(this.portal);
  };

  updateInputs = (inputs: any) => {
    if (!this.componentRef) {
      return;
    }

    Object.keys(inputs).forEach((key) => {
      this.componentRef.instance[key] = inputs[key];
    });

    this.componentRef.changeDetectorRef.detectChanges();
  };

  renderComponent = (element: Element, inputs: any) => {
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

export function wrapNgComponent<TComponent extends IRenderer>(
  injector: Injector,
  ngComponent: INgComponentConstructor<TComponent>,
): ComponentConstructor<TComponent> {
  return wrapComponent<TComponent>(
    (props: Readonly<TComponent>, nativeElement: Element) => {
      let dynamicComponentLoader: DynamicComponentLoader<TComponent> = cache[
        props.rendererId
      ] as DynamicComponentLoader<TComponent>;

      if (!dynamicComponentLoader) {
        dynamicComponentLoader = new DynamicComponentLoader(
          injector,
          ngComponent,
          () => {
            delete cache[props.rendererId];
          },
        );

        cache[props.rendererId] = dynamicComponentLoader;
      }

      dynamicComponentLoader.renderComponent(nativeElement, props);
      return dynamicComponentLoader.destroyComponent;
    },
  );
}
