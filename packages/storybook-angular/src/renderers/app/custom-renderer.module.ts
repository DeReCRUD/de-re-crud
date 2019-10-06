import { IRendererDefinitions } from '@de-re-crud/ui';
import {
  DeReCrudModule,
  IFormSubmission,
  wrapNgComponent,
} from '@de-re-crud/angular/public-api';
import {
  NgModule,
  Injector,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import schema from '../../schema.json';
import { TableLinkedStructFieldRenderer } from './table-linked-struct-field-renderer.component';
import { TextFieldRenderer } from './text-field-renderer.component';

@Component({
  selector: 'drc-table-linked-struct-field-renderer-form',
  template: `
    <drc-form 
      [schema]="schema"
      [struct]="struct"
      [block]="block"
      [renderers]="renderers"
      (submitted)="onSubmit($event)">
    </drc-form>
  `,
})
export class CustomTableLinkedStructFieldRendererForm {
  schema = schema;

  struct: string = 'struct';

  block: string = 'tableLinkedStruct';

  renderers: Partial<IRendererDefinitions>;

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor(injector: Injector) {
    this.renderers = {
      tableLinkedStructField: wrapNgComponent(
        injector,
        TableLinkedStructFieldRenderer,
      ),
    };
  }

  onSubmit = (e: IFormSubmission) => {
    this.submitted.emit(e);
  };
}

@Component({
  selector: 'drc-text-field-renderer-form',
  template: `
    <drc-form 
      [schema]="schema"
      [struct]="struct"
      [block]="block"
      [renderers]="renderers"
      (submitted)="onSubmit($event)">
    </drc-form>
  `,
})
export class CustomTextFieldRendererForm {
  schema = schema;

  struct: string = 'struct';

  block: string = 'text';

  renderers: Partial<IRendererDefinitions>;

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor(injector: Injector) {
    this.renderers = {
      textField: wrapNgComponent(injector, TextFieldRenderer),
    };
  }

  onSubmit = (e: IFormSubmission) => {
    this.submitted.emit(e);
  };
}

@NgModule({
  imports: [CommonModule, DeReCrudModule],
  declarations: [
    CustomTableLinkedStructFieldRendererForm,
    CustomTextFieldRendererForm,
    TableLinkedStructFieldRenderer,
    TextFieldRenderer,
  ],
  exports: [
    CustomTableLinkedStructFieldRendererForm,
    CustomTextFieldRendererForm,
  ],
  entryComponents: [TableLinkedStructFieldRenderer, TextFieldRenderer],
})
export class CustomRendererModule {}
