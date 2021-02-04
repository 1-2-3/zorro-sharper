import { Component, Input, HostBinding, SimpleChanges, ViewChild } from '@angular/core';
import { NzFormItemComponent, NzFormControlComponent } from 'ng-zorro-antd/form';
import { NsFormErrorTipService } from '../service/ns-form-error-tip.service';
import { NsFormErrorType } from '../service/ns-form-error-type';

@Component({
  selector: 'ns-form-error-tips',
  template: `
    <ng-template #errorTpl let-control>
      <ng-container *ngFor="let err of errorTypes">
        <ng-container *ngIf="control.hasError(err.errorType)">
          {{
            control.getError(err.errorType)?.msg
              ? control.getError(err.errorType)?.msg
              : err.defaultMessage
          }}
        </ng-container>
      </ng-container>
    </ng-template>
  `
})
export class NsFormErrorTipsComponent {
  @ViewChild('errorTpl', { static: true }) _errorTpl;

  constructor(private errorTipService: NsFormErrorTipService) {}

  get errorTpl() {
    return this._errorTpl;
  }

  get errorTypes(): NsFormErrorType[] {
    return this.errorTipService.errorTypes;
  }
}
