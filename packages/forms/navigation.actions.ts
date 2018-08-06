import { INavState, IStoreState } from "./store";

export default function navigationActions() {
  return {
    push: (store: IStoreState, navState: INavState): Partial<IStoreState> => {
      const { navStack } = store;

      const newStack = navStack.concat();
      newStack.push(navState);

      return {
        navStack: newStack
      };
    },

    pop: (store: IStoreState): Partial<IStoreState> => {
      const { navStack } = store;

      const newStack = navStack.concat();
      newStack.pop();

      return {
        navStack: newStack
      };
    }
  };
}
