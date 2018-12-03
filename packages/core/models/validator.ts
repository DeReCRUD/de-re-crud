import { FieldValue, IField } from './schema';

export abstract class Validator {
  public abstract get name(): string;
  public abstract validate(field: IField, value: FieldValue): boolean;
}
