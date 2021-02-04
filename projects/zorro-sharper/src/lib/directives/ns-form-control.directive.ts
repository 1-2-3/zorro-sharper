import { Directive, ChangeDetectorRef } from '@angular/core';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NsFormItemDirective } from './ns-form-item.directive';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[nsFormControl]',
})
export class NsFormControlDirective {
  constructor(
    private formControl: NzFormControlComponent,
    private formItemDirective: NsFormItemDirective,
    private cd: ChangeDetectorRef
  ) {
    formItemDirective.setFormControl(formControl);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (
        this.formControl.validateControl &&
        this.formControl.validateControl.errors &&
        Object.keys(this.formControl.validateControl.errors).length
      ) {
        if (this.formControl.nzHasFeedback == false) {
          this.formControl.nzHasFeedback = true;
          this.cd.detectChanges();
        }
      }
    }, 0);
  }
}
