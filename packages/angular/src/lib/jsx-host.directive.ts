import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
} from '@angular/core';
import { h, renderElement } from '@de-re-crud/ui';

@Directive({
  selector: '[drcJsxHost]',
})
export class JsxHostDirective implements AfterViewInit, OnChanges {
  @Input('drcJsxHost')
  formId: string;

  @Input('drcJsxHostElement')
  element: h.JSX.Element | h.JSX.Element[];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  render() {
    renderElement(this.formId, this.element, this.el.nativeElement);
  }
}
