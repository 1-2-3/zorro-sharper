import { Directive, ChangeDetectorRef } from "@angular/core";
import { NzFormLabelComponent } from "ng-zorro-antd";
import { NsFormItemDirective } from "./ns-form-item.directive";

@Directive({
  selector: "[nsFormLabel]",
})
export class NsFormLabelDirective {
  constructor(
    private label: NzFormLabelComponent,
    private formItemDirective: NsFormItemDirective,
    private cd: ChangeDetectorRef
  ) {
    formItemDirective.setLabel(label);
  }

  ngAfterViewInit() {
    // 根据表单验证条件赋值 nzHasFeedback 和 nzRequired
    if (
      this.formItemDirective.formControl.validateControl &&
      this.formItemDirective.formControl.validateControl.errors &&
      this.formItemDirective.formControl.validateControl.errors.required
    ) {
      if (this.label.nzRequired == false) {
        this.label.nzRequired = true;
        this.cd.detectChanges();
      }
    }
  }
}
