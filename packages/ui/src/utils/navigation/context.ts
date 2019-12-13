import { createContext } from 'preact';

export interface INavState {
  path: string;
  struct: string;
  block: string;
}

export interface INavContext {
  stack: INavState[];
  push: (state: INavState) => void;
  pop: () => void;
}

const NavContext = createContext<INavContext>({
  stack: [],
  push: () => {},
  pop: () => {},
});

export default NavContext;
