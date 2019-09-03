import { NgModule } from '@angular/core';
import { FormComponent } from './form.component';
import { FormHostDirective } from './form-host.directive';

@NgModule({
  imports: [],
  declarations: [FormComponent, FormHostDirective],
  exports: [FormComponent],
})
export class DeReCrudModule {}
