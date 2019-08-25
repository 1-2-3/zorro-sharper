import { Injectable } from "@angular/core";
import { NsFormErrorType } from "./ns-form-error-type";

/**
 * 表单错误提示信息
 */
@Injectable({
  providedIn: "root"
})
export class NsFormErrorTipService {
  constructor() {}

  /**
   * 注册错误提示信息
   * @param errorType
   */
  registerErrorType(errorType: NsFormErrorType) {
    this.errorTypes.push(errorType);
  }

  errorTypes: NsFormErrorType[] = [];
}
