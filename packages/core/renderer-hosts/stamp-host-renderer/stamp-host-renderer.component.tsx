import { h } from 'preact';
import BaseComponent from '../../base-component';
import { IStampHostRendererProps } from './stamp-host-renderer.props';

export default class StampHostRenderer extends BaseComponent<
  IStampHostRendererProps
> {
  public render() {
    const { stamp, formValue, parentValue, rendererOptions } = this.props;

    if (!stamp.condition(parentValue, formValue)) {
      return null;
    }

    const StampRenderer = rendererOptions.components.stamp;

    return <StampRenderer text={stamp.text} size={stamp.size} />;
  }
}
