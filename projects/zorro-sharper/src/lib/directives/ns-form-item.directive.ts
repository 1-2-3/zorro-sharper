import { Directive } from "@angular/core";
import { NzFormLabelComponent, NzFormControlComponent } from "ng-zorro-antd";

@Directive({
  selector: "[nsFormItem]",
})
export class NsFormItemDirective {
  constructor() {}

  label: NzFormLabelComponent;

  formControl: NzFormControlComponent;

  setFormControl(formControl: NzFormControlComponent) {
    this.formControl = formControl;
    return this;
  }

  setLabel(label: NzFormLabelComponent) {
    this.label = label;
    return this;
  }
}
