import { INavState, IStoreState } from './store';

export default function navigationActions() {
  return {
    push: (state: IStoreState, navState: INavState): Partial<IStoreState> => {
      const { navStack } = state;

      const newStack = navStack.concat();
      newStack.push(navState);

      return {
        navStack: newStack
      };
    },

    pop: (state: IStoreState): Partial<IStoreState> => {
      const { navStack } = state;

      const newStack = navStack.concat();
      newStack.pop();

      return {
        navStack: newStack
      };
    }
  };
}
