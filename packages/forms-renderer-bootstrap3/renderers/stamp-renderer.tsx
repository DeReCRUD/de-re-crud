import { IStampRenderer } from "@de-re-crud/forms/models/renderers";
import { h } from "preact";
import "./stamp-renderer.css";

const Bootstrap3StampRenderer = ({ text, size }: IStampRenderer) => {
  const HeaderComponent = `h${size}`;

  return (
    <HeaderComponent className="bootstrap3-stamp-renderer">
      {text}
    </HeaderComponent>
  );
};

export default Bootstrap3StampRenderer;
