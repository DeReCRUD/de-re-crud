import { h, FunctionalComponent, ComponentChild } from 'preact';
import { useMemo } from 'preact/hooks';
import NavContext, { INavContext, INavState } from './context';
import { popLocation, pushLocation } from './actions';

export interface INavProviderProps {
  stack: INavState[];
  onStackChange: (stack: INavState[]) => void;
  children: ComponentChild;
}

const NavProvider: FunctionalComponent<INavProviderProps> = ({
  stack,
  onStackChange,
  children,
}) => {
  const contextValue = useMemo(
    () => {
      const value: INavContext = {
        stack,
        pop: () => {
          onStackChange(popLocation(stack));
        },
        push: (state) => {
          onStackChange(pushLocation(stack, state));
        },
      };
      return value;
    },
    [stack, onStackChange],
  );

  return (
    <NavContext.Provider value={contextValue}>{children}</NavContext.Provider>
  );
};

export default NavProvider;
