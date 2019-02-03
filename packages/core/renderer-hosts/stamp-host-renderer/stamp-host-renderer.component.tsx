import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IStampHostRendererProps } from './stamp-host-renderer.props';

export default class StampHostRenderer extends BaseComponent<
  IStampHostRendererProps
> {
  public render() {
    const { rendererId, stamp, formValue, parentValue, renderers } = this.props;

    if (!stamp.condition(parentValue, formValue)) {
      return null;
    }

    const StampRenderer = renderers.stamp;

    return (
      <StampRenderer
        rendererId={rendererId}
        text={stamp.text}
        size={stamp.size}
      />
    );
  }
}
