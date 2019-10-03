import { h, IStampRenderer } from '@de-re-crud/ui';

const Bootstrap4StampRenderer = ({ text, size }: IStampRenderer) => {
  const HeaderComponent: any = `h${size}`;

  return (
    <HeaderComponent className="bootstrap4-stamp-renderer">
      {text}
    </HeaderComponent>
  );
};

export default Bootstrap4StampRenderer;
