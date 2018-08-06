import { StoreState, NavState } from "./store";

export default function navigationActions() {
  return {
    push: (store: StoreState, navState: NavState): Partial<StoreState> => {
      const { navStack } = store;

      const newStack = navStack.concat();
      newStack.push(navState);

      return {
        navStack: newStack
      };
    },

    pop: (store: StoreState): Partial<StoreState> => {
      const { navStack } = store;

      const newStack = navStack.concat();
      newStack.pop();

      return {
        navStack: newStack
      };
    }
  };
}
