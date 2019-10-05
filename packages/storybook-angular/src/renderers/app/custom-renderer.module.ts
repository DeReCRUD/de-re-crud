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
import { TableLinkedStructRenderer } from './table-linked-struct-renderer.component';
import schema from '../../schema.json';
import { TextFieldRenderer } from './text-field-renderer.component';

@Component({
  selector: 'drc-table-struct-renderer-form',
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
export class CustomTableLinkedStructRendererForm {
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
        TableLinkedStructRenderer,
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
    CustomTableLinkedStructRendererForm,
    CustomTextFieldRendererForm,
    TableLinkedStructRenderer,
    TextFieldRenderer,
  ],
  exports: [CustomTableLinkedStructRendererForm, CustomTextFieldRendererForm],
  entryComponents: [TableLinkedStructRenderer, TextFieldRenderer],
})
export class CustomRendererModule {}
