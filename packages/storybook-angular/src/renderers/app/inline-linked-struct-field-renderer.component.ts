import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import {
  IInlineLinkedStructFieldRenderer,
  createCssClass,
} from '@de-re-crud/ui';
import { NgRenderer } from '@de-re-crud/angular';

@Component({
  selector: 'drc-inline-linked-struct-field-renderer',
  templateUrl: './inline-linked-struct-field-renderer.component.html',
})
export class InlineLinkedStructFieldRenderer extends NgRenderer<
  IInlineLinkedStructFieldRenderer
> {
  constructor(@Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  getCssName = (...names: string[]) => {
    return createCssClass(
      'de-re-crud-angular-inline-linked-struct-field-renderer',
      ...names,
    );
  };
}
