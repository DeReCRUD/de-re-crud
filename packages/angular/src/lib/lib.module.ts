import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormHostDirective } from './form-host.directive';
import { JsxHostDirective } from './jsx-host.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FormComponent, JsxHostDirective, FormHostDirective],
  exports: [FormComponent, JsxHostDirective],
})
export class DeReCrudModule {}
