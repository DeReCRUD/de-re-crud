import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { FormHostDirective } from './form-host.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FormComponent, FormHostDirective],
  exports: [FormComponent],
})
export class DeReCrudModule {}
