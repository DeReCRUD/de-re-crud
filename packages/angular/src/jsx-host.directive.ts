import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drcJsxHost]',
})
export class JsxHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
