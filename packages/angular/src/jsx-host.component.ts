import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
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
export class JsxHostComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  formId: string;

  @Input()
  element;

  @ViewChild(JsxHostDirective, { static: false })
  private jsxHost: JsxHostDirective;

  private destroyFn: Function;

  ngAfterViewInit() {
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  ngOnDestroy() {
    if (this.destroyFn) {
      this.destroyFn();
    }
  }

  render() {
    if (!this.jsxHost) {
      return;
    }

    const { nativeElement } = this.jsxHost.viewContainerRef.element;

    const element = renderElement(this.formId, this.element, nativeElement);
    this.destroyFn = element.destroy;
  }
}
