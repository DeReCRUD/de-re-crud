import { Component } from '@angular/core';
import { ITableLinkedStructRenderer, createCssClass } from '@de-re-crud/ui';
import { NgRenderer } from '@de-re-crud/angular/src/lib/renderer';

interface IRow {
  columns: string[];
}

@Component({
  selector: 'drc-table-struct-renderer',
  templateUrl: './table-linked-struct-renderer.component.html',
})
export class TableLinkedStructRenderer extends NgRenderer<
  ITableLinkedStructRenderer
> {
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
