import shallowCompare from '@de-re-crud/core/utils/shallow-compare';
import { Component as PreactComponent } from 'preact';

export default abstract class BaseComponent<
  P = {},
  S = {}
> extends PreactComponent<P, S> {
  public shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    _: any
  ) {
    return shallowCompare(this, nextProps, nextState);
  }
}
