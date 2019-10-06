import { createContext } from 'preact';

export interface IFormContext {
  submitting: boolean;
  submit: () => void;
}

export const FormContext = createContext<IFormContext>({
  submitting: false,
  submit: () => {
    throw new Error('Not implemented');
  },
});
