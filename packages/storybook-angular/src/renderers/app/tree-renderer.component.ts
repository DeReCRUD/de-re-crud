import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { TableLinkedStructFieldRenderer } from './table-linked-struct-field-renderer.component';

@Component({
  selector: 'drc-tree',
  templateUrl: './tree-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeRenderer extends TableLinkedStructFieldRenderer {
  constructor(@Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }
}
