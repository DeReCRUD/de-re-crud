import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { renderElement } from '@de-re-crud/ui';
import { JsxHostDirective } from './jsx-host.directive';

@Component({
  selector: 'drc-jsx-host',
  template: `
    <div class="de-re-crud-angular-jsx-host" drcJsxHost></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsxHostComponent implements AfterViewInit, OnChanges {
  @Input()
  formId: string;

  @Input()
  element;

  @ViewChild(JsxHostDirective, { static: false })
  jsxHost: JsxHostDirective;

  ngAfterViewInit() {
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  render() {
    if (!this.jsxHost) {
      return;
    }

    const { nativeElement } = this.jsxHost.viewContainerRef.element;

    renderElement(this.formId, this.element, nativeElement);
  }
}
