import {
  Directive,
  TemplateRef,
  EmbeddedViewRef,
  ViewContainerRef,
} from "@angular/core";
import {
  NzFormLabelComponent,
  NzFormControlComponent,
} from "ng-zorro-antd/form";

/**
 * 简化表单验证反馈
 */
@Directive({
  selector: "[nsAutoFeedback]",
})
export class NsAutoFeedbackDirective {
  constructor(
    private _viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Context>
  ) {
    this._templateRef = templateRef;
  }
  private _context: Context = new Context();
  private _templateRef: TemplateRef<Context> | null = null;
  private _viewRef: EmbeddedViewRef<Context> | null = null;

  private _labelCmp = null;

  private _formControlCmp = null;

  private _formControlNameDirective = null;
  /*
  ngOnInit() {
    this._updateView();
  }

  ngDoCheck(): void {
    if (this._viewRef && this._viewRef._view && this._viewRef._view.nodes) {
      const label = this.getLabelCmp();
      const control = this.getFormControlCmp();
      const formControlName = this.getFormControlNameDirective();

      // 根据表单验证条件赋值 nzHasFeedback 和 nzRequired
      if (label && control) {
        if (
          control.instance.validateControl &&
          control.instance.validateControl.errors &&
          Object.keys(control.instance.validateControl.errors).length
        ) {
          if (control.instance.nzHasFeedback == false) {
            control.instance.nzHasFeedback = true;
          }
        }

        if (
          control.instance.validateControl &&
          control.instance.validateControl.errors &&
          control.instance.validateControl.errors.required
        ) {
          if (label.instance.nzRequired == false) {
            label.instance.nzRequired = true;
          }
        }
      }

      // 根据 formControlName 赋值 id 属性。label 赋值 nzFor 属性
      if (
        label &&
        formControlName &&
        formControlName.instance &&
        formControlName.instance.name
      ) {
        if (
          control.instance.elementRef &&
          control.instance.elementRef.nativeElement
        ) {
          const editControl = control.instance.elementRef.nativeElement.querySelector(
            "[formcontrolname]"
          );
          if (editControl) {
            editControl.id = formControlName.instance.name;
            label.instance.nzFor = formControlName.instance.name;
          }
        }
      }
    }
  }

  ngAfterViewInit() {}
  private getLabelCmp() {
    if (!this._labelCmp) {
      this._labelCmp = this._viewRef._view.nodes.find(
        (n) =>
          n.instance &&
          n.instance.elementRef &&
          n.instance.elementRef.nativeElement &&
          n.instance.elementRef.nativeElement.localName == "nz-form-label"
        // n.instance.constructor &&
        // n.instance.constructor.name == "NzFormLabelComponent"
      );
    }

    return this._labelCmp;
  }
  private getFormControlCmp() {
    if (!this._formControlCmp) {
      this._formControlCmp = this._viewRef._view.nodes.find(
        (n) =>
          n.instance &&
          n.instance.elementRef &&
          n.instance.elementRef.nativeElement &&
          n.instance.elementRef.nativeElement.localName == "nz-form-control"
        // n.instance.constructor &&
        // n.instance.constructor.name == "NzFormControlComponent"
      );
    }

    return this._formControlCmp;
  }
  private getFormControlNameDirective() {
    if (!this._formControlNameDirective) {
      this._formControlNameDirective = this._viewRef._view.nodes.find(
        (n) =>
          n.instance &&
          n.instance.control &&
          n.instance.control.hasOwnProperty("asyncValidator") &&
          n.instance.control.hasOwnProperty("errors")
        // n.instance.constructor && n.instance.constructor.name == "FormControlName"
      );
    }

    return this._formControlNameDirective;
  }

  private _updateView() {
    this._viewRef = this._viewContainer.createEmbeddedView(
      this._templateRef,
      this._context
    );
    console.log(
      `TCL- ~ NsAutoFeedbackDirective ~ _updateView ~ this._viewRef`,
      this._viewRef
    );
  }
  */
}

class Context {
  public $implicit: any = null;
}
