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
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import schema from '../../schema.json';
import { TableLinkedStructFieldRenderer } from './table-linked-struct-field-renderer.component';
import { TextFieldRenderer } from './text-field-renderer.component';
import { InlineLinkedStructFieldRenderer } from './inline-linked-struct-field-renderer.component';
import { TreeRenderer } from './tree-renderer.component';

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
export class CustomRendererForm implements OnChanges {
  @Input()
  struct: string = 'struct';

  @Input()
  block: string;

  @Input()
  rendererType: 'tableLinkedStruct' | 'text' | 'inlineLinkedStruct' | 'tree';

  renderers: Partial<IRendererDefinitions>;

  schema = schema;

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor(private injector: Injector) {}

  ngOnChanges() {
    this.renderers = {};

    switch (this.rendererType) {
      case 'tableLinkedStruct':
        this.renderers.tableLinkedStructField = wrapNgComponent(
          this.injector,
          TableLinkedStructFieldRenderer,
        );
        break;
      case 'inlineLinkedStruct':
        this.renderers.inlineLinkedStructField = wrapNgComponent(
          this.injector,
          InlineLinkedStructFieldRenderer,
        );
        break;
      case 'text':
        this.renderers.textField = wrapNgComponent(
          this.injector,
          TextFieldRenderer,
        );
        break;
      case 'tree':
        this.renderers.tableLinkedStructField = wrapNgComponent(
          this.injector,
          TreeRenderer,
        );
        break;
      default:
        throw new Error('Not supported');
    }
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
    TreeRenderer,
  ],
  exports: [CustomRendererForm],
  entryComponents: [
    TableLinkedStructFieldRenderer,
    TextFieldRenderer,
    InlineLinkedStructFieldRenderer,
    TreeRenderer,
  ],
})
export class CustomRendererModule {}
