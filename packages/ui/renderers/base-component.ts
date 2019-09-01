import { Component as PreactComponent } from 'preact';
import shallowCompare from './utils/shallow-compare';

export default abstract class BaseComponent<
  P = {},
  S = {}
> extends PreactComponent<P, S> {
  public shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>) {
    return shallowCompare(this, nextProps, nextState);
  }
}
