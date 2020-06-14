import { IFieldContainerRenderer, createCssClass } from '@de-re-crud/ui';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { NgRenderer } from '@de-re-crud/angular';

@Component({
  selector: 'drc-field-container',
  templateUrl: './field-container-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldContainerRenderer extends NgRenderer<
  IFieldContainerRenderer
> {
  constructor(@Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  getCssName = (...names: string[]) => {
    return createCssClass(
      'de-re-crud-angular-field-container-renderer',
      ...names,
    );
  };
}
