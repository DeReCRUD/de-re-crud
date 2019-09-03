import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[drcFormHost]',
})
export class FormHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
