import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { JsxHostDirective } from './jsx-host.directive';
import { JsxHostComponent } from './jsx-host.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FormComponent, JsxHostComponent, JsxHostDirective],
  exports: [FormComponent, JsxHostComponent],
})
export class DeReCrudModule {}
