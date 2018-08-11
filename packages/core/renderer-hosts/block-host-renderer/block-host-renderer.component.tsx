import { h } from "preact";
import BaseComponent from "../../base-component";
import { IFieldReference, IStamp } from "../../models/schema";
import FieldHostRenderer from "../field-host-renderer";
import StampHostRenderer from "../stamp-host-renderer";
import { IBlockHostRendererProps } from "./block-host-renderer.props";

export default class BlockHostRenderer extends BaseComponent<
  IBlockHostRendererProps
> {
  public render() {
    const { struct, block, path, formValue } = this.props;

    if (!block.condition(formValue)) {
      return null;
    }

    return (
      <div class="de-re-crud-block-renderer">
        {block.items.map((item) => {
          const stamp = item as IStamp;
          if (stamp.text) {
            return (
              <StampHostRenderer
                key={`${struct}${path && `-${path}`}-stamp-${
                  stamp.blockInstance
                }`}
                stamp={stamp}
                parentPath={path}
              />
            );
          }

          const fieldReference = item as IFieldReference;
          if (fieldReference.field) {
            return (
              <FieldHostRenderer
                key={`${struct}${path && `-${path}`}-${
                  fieldReference.field.name
                }`}
                fieldReference={fieldReference}
                parentPath={path}
              />
            );
          }
        })}
      </div>
    );
  }
}
