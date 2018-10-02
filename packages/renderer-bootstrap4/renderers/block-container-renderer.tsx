import { IBlockContainerRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';

const Bootstrap4BlockContainerRenderer = ({
  rows
}: IBlockContainerRenderer) => (
  <div className="bootstrap4-block-container-renderer">
    {rows.map((row) => (
      <div className="form-row">
        {row.cells.map((cell) => (
          <div className={`col-sm-${cell.width}`}>{cell.renderedItem}</div>
        ))}
      </div>
    ))}
  </div>
);

export default Bootstrap4BlockContainerRenderer;