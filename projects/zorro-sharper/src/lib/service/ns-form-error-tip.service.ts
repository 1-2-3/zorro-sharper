import { Injectable } from '@angular/core';
import { NsFormErrorType } from './ns-form-error-type';

/**
 * 表单错误提示信息
 */
@Injectable({
  providedIn: 'root',
})
export class NsFormErrorTipService {
  constructor() {}

  errorTypes: NsFormErrorType[] = [];

  /**
   * 注册错误提示信息
   */
  registerErrorType(errorType: NsFormErrorType) {
    this.errorTypes.push(errorType);
  }
}
