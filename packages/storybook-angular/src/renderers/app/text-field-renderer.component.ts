import { INgRenderer } from '@de-re-crud/angular/public-api';
import { ITextFieldRenderer, createCssClass } from '@de-re-crud/ui';
import { Input, Component } from '@angular/core';

@Component({
  selector: 'drc-text-field',
  templateUrl: './text-field-renderer.component.html',
})
export class TextFieldRenderer implements INgRenderer<ITextFieldRenderer> {
  @Input()
  props: ITextFieldRenderer;

  getCssName = (...names: string[]) => {
    return createCssClass('de-re-crud-angular-text-field-renderer', ...names);
  };
}
