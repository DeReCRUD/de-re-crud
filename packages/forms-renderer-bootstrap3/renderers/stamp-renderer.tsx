import { h } from 'preact';
import { StampRendererProps } from '@de-re-crud/forms/models/renderers';
import './stamp-renderer.css';

const Bootstrap3StampRenderer = ({
  text,
  size
}: StampRendererProps) => {
  const HeaderComponent = `h${size}`;

  return (<HeaderComponent className="bootstrap3-stamp-renderer">{text}</HeaderComponent>);
};

export default Bootstrap3StampRenderer;