import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtValidators } from 'src/app/shared/ext-validators';

@Component({
  selector: 'app-form-error-tip',
  templateUrl: './form-error-tip.component.html',
})
export class FormErrorTipComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        id: ['', []],
        userText: ['', [Validators.required]],
        userCode: ['', [Validators.required]],
        age: ['16', [Validators.required, ExtValidators.isInt]],
        age2: ['15', [Validators.required, ExtValidators.isInt]],
      },
      { validators: [ExtValidators.greateEqual('age2', 'age', '虚岁应大于或等于年龄')] },
    );
  }

  submit(): void {
    for (const name in this.formGroup.controls) {
      if (this.formGroup.controls.hasOwnProperty(name)) {
        this.formGroup.controls[name].markAsDirty();
        this.formGroup.controls[name].updateValueAndValidity();
      }
    }
  }
}
