import { Input, Component, ChangeDetectionStrategy } from '@angular/core';
import { ITableLinkedStructRenderer, createCssClass } from '@de-re-crud/ui';
import { INgRenderer } from '@de-re-crud/angular/public-api';

interface IRow {
  columns: string[];
}

@Component({
  selector: 'drc-table-struct-renderer',
  templateUrl: './table-linked-struct-renderer.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableLinkedStructRenderer
  implements INgRenderer<ITableLinkedStructRenderer> {
  @Input()
  props: ITableLinkedStructRenderer;

  get rows(): IRow[] {
    const value: IRow[] = [];

    this.props.value.forEach((columns) => {
      value.push({
        columns: columns.map((x) => x || ' '),
      });
    });

    return value;
  }

  getCssName = (...names: string[]) => {
    return createCssClass('de-re-crud-angular-table-struct-renderer', ...names);
  };

  onAdd = () => {
    this.props.onAdd();
  };

  onEdit = (index: number) => {
    this.props.onEdit(index);
  };

  onRemove = (index: number) => {
    this.props.onRemove(index);
  };
}
