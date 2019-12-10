import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IStampHostRendererProps } from './stamp-host-renderer.props';

export default class StampHostRenderer extends BaseComponent<
  IStampHostRendererProps
> {
  public render() {
    const { formId, rendererId, stamp, renderers } = this.props;
    const customHints = stamp.hints.custom;

    const StampRenderer = renderers.stamp;

    return (
      <StampRenderer
        formId={formId}
        rendererId={rendererId}
        text={stamp.text}
        size={stamp.size}
        hints={customHints}
      />
    );
  }
}
