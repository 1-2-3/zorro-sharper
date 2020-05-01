import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  EventEmitter,
} from "@angular/core";
import {
  NzTreeComponent,
  NzSelectComponent,
  NzFormDirective,
} from "ng-zorro-antd";
import { FormGroup, FormGroupDirective } from "@angular/forms";

/**
 * 下拉框选中项改变时，自动改变FormGroup中的中文描述字段
 */
@Directive({
  selector: "[nsSelectTextField]",
})
export class NsSelectTextFieldDirective {
  constructor(
    private selectCmp: NzSelectComponent,
    private fg: FormGroupDirective
  ) {}

  /**
   * 需要同步改变的文本字段名
   */
  @Input("nsSelectTextField")
  textFieldName: string;

  ngOnInit() {
    let oldOnChange = this.selectCmp.onChange;
    let newOnChange = (v) => {
      if (
        this.selectCmp &&
        this.selectCmp.listOfNzOptionComponent &&
        this.selectCmp.listOfNzOptionComponent.filter
      ) {
        // 按 value 获取选中的数据选项
        let selectedOptions = this.selectCmp.listOfNzOptionComponent.filter(
          (item) => item.nzValue == v
        );

        if (selectedOptions && selectedOptions.length) {
          let selectedText = selectedOptions[0].nzLabel; // 选中的选项的文本
          let textFieldControl = this.fg.form.get(this.textFieldName);

          if (textFieldControl) {
            let currentFormText = textFieldControl.value; // 表单里当前文本值

            if (selectedText != currentFormText) {
              textFieldControl.setValue(selectedText); // 为文本字段赋值
            }
          } else {
            console.error(
              `FormGroup中未定义名为 ${this.textFieldName} 的控件！`
            );
          }
        }

        // 调用以前的 onChange 处理函数
        oldOnChange(v);
      }
    };

    this.selectCmp.registerOnChange(newOnChange);
  }

  ngAfterViewInit() {}
}
