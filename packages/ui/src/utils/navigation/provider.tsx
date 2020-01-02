import { h, FunctionalComponent, ComponentChild } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import NavContext, { INavContext, INavState } from './context';
import { popLocation, pushLocation } from './actions';

export interface INavProviderProps {
  children: ComponentChild;
}

const NavProvider: FunctionalComponent<INavProviderProps> = ({ children }) => {
  const [stack, setStack] = useState<INavState[]>([]);

  const contextValue = useMemo(
    () => {
      const value: INavContext = {
        stack,
        pop: () => {
          setStack(popLocation(stack));
        },
        push: (state) => {
          setStack(pushLocation(stack, state));
        },
      };
      return value;
    },
    [stack],
  );

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};

export default NavProvider;
