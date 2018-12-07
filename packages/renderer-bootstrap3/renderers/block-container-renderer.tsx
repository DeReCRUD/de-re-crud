import { IBlockContainerRenderer } from '@de-re-crud/core/models/renderers';
import { h } from 'preact';

const Bootstrap3BlockContainerRenderer = ({
  rows,
}: IBlockContainerRenderer) => (
  <div className="bootstrap3-block-container-renderer">
    {rows.map((row) => (
      <div className="row">
        {row.cells.map((cell) => (
          <div className={`col-sm-${cell.width}`}>{cell.renderedItem}</div>
        ))}
      </div>
    ))}
  </div>
);

export default Bootstrap3BlockContainerRenderer;
