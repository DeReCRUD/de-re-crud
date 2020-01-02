import { INavState } from './context';

export function pushLocation(stack: INavState[], state: INavState) {
  const newStack = stack.concat();
  newStack.push(state);
  return newStack;
}

export function popLocation(stack: INavState[]) {
  const newStack = stack.concat();
  newStack.pop();
  return newStack;
}
