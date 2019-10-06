import { ITextFieldRenderer, createCssClass } from '@de-re-crud/ui';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgRenderer } from '@de-re-crud/angular/public-api';

@Component({
  selector: 'drc-text-field',
  templateUrl: './text-field-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldRenderer extends NgRenderer<ITextFieldRenderer> {
  getCssName = (...names: string[]) => {
    return createCssClass('de-re-crud-angular-text-field-renderer', ...names);
  };
}
