import { Directive, ElementRef, Input, Renderer2, EventEmitter, OnInit } from '@angular/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { FormGroup, FormGroupDirective } from '@angular/forms';

/**
 * 下拉框选中项改变时，自动改变FormGroup中的中文描述字段
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsSelectTextField]',
})
export class NsSelectTextFieldDirective implements OnInit {
  constructor(private selectCmp: NzSelectComponent, private fg: FormGroupDirective) {}

  /**
   * 需要同步改变的文本字段名
   */
  @Input('nsSelectTextField')
  textFieldName: string;

  ngOnInit() {
    const oldOnChange = this.selectCmp.onChange;
    const newOnChange = (v) => {
      if (this.selectCmp && this.selectCmp.listOfNzOptionComponent && this.selectCmp.listOfNzOptionComponent.filter) {
        // 按 value 获取选中的数据选项
        const selectedOptions = this.selectCmp.listOfNzOptionComponent.filter((item) => item.nzValue === v);

        if (selectedOptions && selectedOptions.length) {
          const selectedText = selectedOptions[0].nzLabel; // 选中的选项的文本
          const textFieldControl = this.fg.form.get(this.textFieldName);

          if (textFieldControl) {
            const currentFormText = textFieldControl.value; // 表单里当前文本值

            if (selectedText !== currentFormText) {
              textFieldControl.setValue(selectedText); // 为文本字段赋值
            }
          } else {
            console.error(`FormGroup中未定义名为 ${this.textFieldName} 的控件！`);
          }
        }

        // 调用以前的 onChange 处理函数
        oldOnChange(v);
      }
    };

    this.selectCmp.registerOnChange(newOnChange);
  }
}
