import { h, Component } from "preact";
import { StampHostRendererProps } from "./stamp-host-renderer.props";

export default class StampHostRenderer extends Component<
  StampHostRendererProps
> {
  render({
    stamp,
    formValue,
    parentValue,
    rendererOptions
  }: StampHostRendererProps) {
    if (!stamp.condition(parentValue, formValue)) {
      return null;
    }

    const StampRenderer = rendererOptions.components.stamp;

    return <StampRenderer text={stamp.text} size={stamp.size} />;
  }
}
