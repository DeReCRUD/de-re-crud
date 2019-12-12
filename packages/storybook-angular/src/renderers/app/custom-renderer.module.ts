import { IRendererDefinitions } from '@de-re-crud/ui';
import {
  DeReCrudModule,
  IFormSubmission,
  wrapNgComponent,
} from '@de-re-crud/angular';
import {
  NgModule,
  Injector,
  Component,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import schema from '../../schema.json';
import { TableLinkedStructFieldRenderer } from './table-linked-struct-field-renderer.component';
import { TextFieldRenderer } from './text-field-renderer.component';
import { InlineLinkedStructFieldRenderer } from './inline-linked-struct-field-renderer.component';

@Component({
  selector: 'drc-custom-renderer-form',
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
export class CustomRendererForm {
  @Input()
  block: string;

  schema = schema;

  struct: string = 'struct';

  renderers: Partial<IRendererDefinitions>;

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor(injector: Injector) {
    this.renderers = {
      tableLinkedStructField: wrapNgComponent(
        injector,
        TableLinkedStructFieldRenderer,
      ),
      textField: wrapNgComponent(injector, TextFieldRenderer),
      inlineLinkedStructField: wrapNgComponent(
        injector,
        InlineLinkedStructFieldRenderer,
      ),
    };
  }

  onSubmit = (e: IFormSubmission) => {
    this.submitted.emit(e);
  };
}

@NgModule({
  imports: [CommonModule, DeReCrudModule],
  declarations: [
    CustomRendererForm,
    TableLinkedStructFieldRenderer,
    TextFieldRenderer,
    InlineLinkedStructFieldRenderer,
  ],
  exports: [CustomRendererForm],
  entryComponents: [
    TableLinkedStructFieldRenderer,
    TextFieldRenderer,
    InlineLinkedStructFieldRenderer,
  ],
})
export class CustomRendererModule {}
