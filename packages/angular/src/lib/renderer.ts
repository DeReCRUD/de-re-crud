import { IRenderer } from '@de-re-crud/ui';
import { Input, ChangeDetectorRef, Inject } from '@angular/core';

export interface INgRenderer<R extends IRenderer> {
  props: R;
}

export abstract class NgRenderer<TRenderer extends IRenderer>
  implements INgRenderer<TRenderer> {
  private renderer: TRenderer;

  constructor(
    @Inject(ChangeDetectorRef) private changeDetectorRef: ChangeDetectorRef,
  ) {}

  get props() {
    return this.renderer;
  }

  @Input()
  set props(value: TRenderer) {
    this.renderer = value;
    this.changeDetectorRef.detectChanges();
  }
}
