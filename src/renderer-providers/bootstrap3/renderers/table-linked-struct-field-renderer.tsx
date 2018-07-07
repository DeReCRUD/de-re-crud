import { h } from 'preact';
import { LinkedStructRendererProps } from '../../../core/models/renderers';
import createCssClass from '../utils/create-css-class';
import Bootstrap3LabelRenderer from './label-renderer.component';
import './table-linked-struct-field-renderer.css';

const cssName = 'bootstrap3-table-linked-struct-renderer';

const Bootstrap3TableLinkedStructFieldRenderer = ({
  label,
  required,
  headers,
  values,
  onAdd
}: LinkedStructRendererProps) => (
  <div className={createCssClass(cssName)}>
    <div className={createCssClass(cssName, 'controls')}>
      <Bootstrap3LabelRenderer label={label} fieldRequired={required} />
      <button className="btn btn-sm btn-default" type="button" onClick={onAdd}>
        Add
      </button>
    </div>
    <table className="table table-bordered table-condensed">
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
          <th>&nbsp;</th>
        </tr>
        
      </thead>
      <tbody>
        <tr>{!values.length ? <td colSpan={100}>None</td> : null}</tr>
      </tbody>
    </table>
  </div>
);

export default Bootstrap3TableLinkedStructFieldRenderer;
