import { INavState } from './utils/navigation/context';

export interface IFormState {
  submitting: boolean;
  navStack: INavState[];
}

export type FormStateSubscriber = (state: IFormState) => void;

export class FormState {
  private static cache: { [formId: string]: IFormState } = {};

  private static subscribers: { [formId: string]: FormStateSubscriber[] } = {};

  static get(formId: string): IFormState {
    if (!FormState.cache[formId]) {
      FormState.cache[formId] = {
        submitting: false,
        navStack: [],
      };
    }

    return FormState.cache[formId];
  }

  static update(formId: string, updates: Partial<IFormState>): void {
    FormState.cache[formId] = {
      ...FormState.cache[formId],
      ...updates,
    };

    if (FormState.subscribers[formId]) {
      FormState.subscribers[formId].forEach((subscription) => {
        subscription(FormState.cache[formId]);
      });
    }
  }

  static remove(formId: string): void {
    delete FormState.cache[formId];
  }

  static subscribe(
    formId: string,
    subscriber: FormStateSubscriber,
  ): (() => void) {
    if (!FormState.subscribers[formId]) {
      FormState.subscribers[formId] = [];
    }

    FormState.subscribers[formId].push(subscriber);

    return () => {
      const index = FormState.subscribers[formId].indexOf(subscriber);
      if (index >= 0) {
        FormState.subscribers[formId].splice(index, 1);
      }
    };
  }
}
