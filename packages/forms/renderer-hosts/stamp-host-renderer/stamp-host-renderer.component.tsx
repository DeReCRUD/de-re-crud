import { Component, h } from "preact";
import { IStampHostRendererProps } from "./stamp-host-renderer.props";

export default class StampHostRenderer extends Component<
  IStampHostRendererProps
> {
  public render({
    stamp,
    formValue,
    parentValue,
    rendererOptions
  }: IStampHostRendererProps) {
    if (!stamp.condition(parentValue, formValue)) {
      return null;
    }

    const StampRenderer = rendererOptions.components.stamp;

    return <StampRenderer text={stamp.text} size={stamp.size} />;
  }
}
