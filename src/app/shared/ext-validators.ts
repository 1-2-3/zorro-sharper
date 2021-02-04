import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class ExtValidators {
  /**
   * 验证是整数
   */
  static isInt(control: AbstractControl): ValidationErrors | null {
    if (control && control.value) {
      const v = control.value.toString();
      if (/^\d+$/.test(v)) {
        return null;
      } else {
        return { isInt: v };
      }
    } else {
      return null;
    }
  }

  /**
   * 验证控件值必须大于等于另一控件的值
   */
  static greateEqual(lhsControlName: string, rhsControlName: string, errMsg: string) {
    return (formGroup: FormGroup): { [key: string]: any } => {
      const lhsControl = formGroup.get(lhsControlName);
      const rhsControl = formGroup.get(rhsControlName);

      if (lhsControl && rhsControl) {
        let isValid = true;
        const lhsFloat = parseFloat(lhsControl.value);
        const rhsFloat = parseFloat(rhsControl.value);

        if (isNaN(lhsFloat) === false && isNaN(rhsFloat) === false && lhsFloat < rhsFloat) {
          isValid = false;
        }

        if (isValid) {
          return null;
        } else {
          lhsControl.setErrors({
            greateEqual: { msg: errMsg },
          });
          rhsControl.setErrors({
            greateEqual: { msg: errMsg },
          });
          return { greateEqual: { msg: errMsg } };
        }
      } else {
        return null;
      }
    };
  }
}
