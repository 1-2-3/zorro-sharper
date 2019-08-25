/**
 * 表单错误提示类型
 */
export interface NsFormErrorType {
  /**
   * 错误类型
   * 例如："required"
   */
  errorType: string;

  /**
   * 默认提示信息
   * 例如："必填项"
   */
  defaultMessage: string;
}
