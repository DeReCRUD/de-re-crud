import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FieldValue, ICollectionReferences, IErrors } from '@de-re-crud/core';
import {
  IButtonOptions,
  IRendererOptions,
  IRendererDefinitions,
  IForm,
  IFieldChangeNotificationParams,
  IFieldParentChangeNotificationParams,
  renderForm,
  FormSubmissionCallback,
  FieldChangeNotificationType,
  FormType,
  FieldChangeNotificationCallback,
  FieldParentChangeNotificationCallback,
} from '@de-re-crud/ui';
import { FormHostDirective } from './form-host.directive';
import {
  IFieldParentChangeEvent,
  IFormSubmission,
  IFieldChangeEvent,
} from './form-submission';

@Component({
  selector: 'drc-form',
  template: `
    <div class="de-re-crud-form-angular" drcFormHost></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnChanges, IForm {
  private instance: IForm;

  @ViewChild(FormHostDirective, { static: true })
  formHost: FormHostDirective;

  @Input()
  type?: FormType;

  @Input()
  cancelVisible: boolean;

  @Input()
  cssClass?: string;

  @Input()
  schema: any;

  @Input()
  struct: string;

  @Input()
  block?: string;

  @Input()
  disabled?: boolean;

  @Input()
  initialErrors?: IErrors;

  @Input()
  initialValue?: any;

  @Input()
  collectionReferences?: ICollectionReferences;

  @Input()
  renderers?: Partial<IRendererDefinitions>;

  @Input()
  rendererOptions?: IRendererOptions;

  @Input()
  buttonOptions?: IButtonOptions;

  @Input()
  fieldChangeInputTimeout?: number;

  @Input()
  fieldChangeType?: FieldChangeNotificationType;

  @Input()
  asyncFieldParentChanges = false;

  @Output()
  fieldChanged = new EventEmitter<IFieldChangeEvent>();

  @Input()
  asyncFieldChanges = false;

  @Output()
  fieldParentChanged = new EventEmitter<IFieldParentChangeEvent>();

  @Output()
  canceled = new EventEmitter();

  @Output()
  submitted = new EventEmitter<IFormSubmission>();

  constructor() {}

  ngOnChanges() {
    this.render();
  }

  onFieldChange = (
    params: IFieldChangeNotificationParams,
    cb: FieldChangeNotificationCallback,
  ) => {
    const event: IFieldChangeEvent = {
      params,
    };

    if (this.asyncFieldChanges) {
      event.onComplete = cb;
    } else {
      cb();
    }

    this.fieldChanged.emit(event);
  };

  onFieldParentChange = (
    params: IFieldParentChangeNotificationParams,
    cb: FieldParentChangeNotificationCallback,
  ) => {
    const event: IFieldParentChangeEvent = {
      params,
    };

    if (this.asyncFieldParentChanges) {
      event.onComplete = cb;
    } else {
      cb();
    }

    this.fieldParentChanged.emit(event);
  };

  onCancel = () => {
    this.canceled.emit();
  };

  onSubmit = (value: any, cb: FormSubmissionCallback) => {
    this.submitted.emit({
      value,
      onComplete: cb,
    });
  };

  reEvaluateConditions = () => {
    this.instance.reEvaluateConditions();
  };

  setValue = (path: string, value?: FieldValue) => {
    this.instance.setValue(path, value);
  };

  render() {
    const { nativeElement } = this.formHost.viewContainerRef.element;

    this.instance = renderForm(
      {
        type: this.type,
        className: this.cssClass,
        schema: this.schema,
        struct: this.struct,
        block: this.block,
        disabled: this.disabled,
        onCancel: this.cancelVisible ? this.onCancel : undefined,
        onFieldChangeInputTimeout: this.fieldChangeInputTimeout,
        onFieldChangeType: this.fieldChangeType,
        onFieldChange: this.onFieldChange,
        onFieldParentChange: this.onFieldParentChange,
        onSubmit: this.onSubmit,
        renderers: this.renderers,
        rendererOptions: this.rendererOptions,
        buttonOptions: this.buttonOptions,
        collectionReferences: this.collectionReferences,
        initialErrors: this.initialErrors,
        initialValue: this.initialValue,
      },
      nativeElement,
    );
  }
}
