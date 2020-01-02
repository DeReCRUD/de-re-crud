import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
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
import { JsxHostDirective } from './jsx-host.directive';
import {
  IFieldParentChangeEvent,
  IFormSubmission,
  IFieldChangeEvent,
} from './form-submission';

@Component({
  selector: 'drc-form',
  template: `
    <div class="de-re-crud-angular-form" drcJsxHost></div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent
  implements AfterViewInit, OnChanges, OnDestroy, IForm {
  private instance: IForm;

  @ViewChild(JsxHostDirective, { static: false })
  jsxHost: JsxHostDirective;

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

  ngAfterViewInit() {
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  ngOnDestroy() {
    this.destroy();
  }

  onFieldChange = (params: IFieldChangeNotificationParams) => {
    const event: IFieldChangeEvent = {
      params,
    };

    this.fieldChanged.emit(event);
  };

  onFieldChangeAsync = (
    params: IFieldChangeNotificationParams,
    cb: FieldChangeNotificationCallback,
  ) => {
    const event: IFieldChangeEvent = {
      params,
      onComplete: cb,
    };

    this.fieldChanged.emit(event);
  };

  onFieldParentChange = (params: IFieldParentChangeNotificationParams) => {
    const event: IFieldParentChangeEvent = {
      params,
    };

    this.fieldParentChanged.emit(event);
  };

  onFieldParentChangeAsync = (
    params: IFieldParentChangeNotificationParams,
    cb: FieldParentChangeNotificationCallback,
  ) => {
    const event: IFieldParentChangeEvent = {
      params,
      onComplete: cb,
    };

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

  getValue = (path?: string) => {
    return this.instance.getValue(path);
  };

  setValue = (path: string, value?: FieldValue, errors?: string[]) => {
    this.instance.setValue(path, value, errors);
  };

  destroy = () => {
    this.instance.destroy();
  };

  setErrors(path: string, errors: string[]) {
    this.instance.setErrors(path, errors);
  }

  render() {
    if (!this.jsxHost) {
      return;
    }

    const { nativeElement } = this.jsxHost.viewContainerRef.element;

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
        onFieldChange: this.asyncFieldChanges
          ? this.onFieldChangeAsync
          : this.onFieldChange,
        onFieldParentChange: this.asyncFieldParentChanges
          ? this.onFieldParentChangeAsync
          : this.onFieldParentChange,
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
