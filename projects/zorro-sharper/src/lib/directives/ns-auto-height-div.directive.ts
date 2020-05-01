import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";

/**
 * 自适应页面高度的Div。
 * 将此指令放置到 Div 组件上，Div组件高度即可自适应页面高度，例：<div ncFullHeightDiv>
 * 如果希望修改底部间距，可设置自定义间距值，例：<div ncFullHeightDiv="100">
 */
@Directive({
  selector: "[nsAutoHeightDiv]",
})
export class NsAutoHeightDivDirective {
  private _offset = 27;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let div = this.el.nativeElement;
    let divTop = 0;
    if (div && div.getBoundingClientRect && div.getBoundingClientRect().top) {
      divTop = div.getBoundingClientRect().top;
    }

    if (div) {
      let topOffset = divTop + this._offset;
      div.style.height = `calc(100vh - ${topOffset}px)`;
      div.style["overflow-y"] = "auto";
    }
  }

  @Input()
  set nsAutoHeightDiv(v: any) {
    let value = parseInt(v);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
