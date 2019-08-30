import { Directive, ElementRef, Input, Renderer } from "@angular/core";

/**
 * 自适应页面高度的标签页。
 * 将此指令放置到标签页组件上，组件高度即可自适应页面高度，例：<nz-tabset nsAutoHeightTabset>
 * 如果希望修改底部间距，可设置自定义间距值，例：<nz-card nsAutoHeightTabset="100">
 */
@Directive({
  selector: "[nsAutoHeightTabset]"
})
export class NsAutoHeightTabsetDirective {
  private _offset = 27;

  constructor(private el: ElementRef, private renderer: Renderer) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let tabset = this.el.nativeElement;
    let tabpaneList = tabset.querySelectorAll(".ant-tabs-tabpane");
    for (let tabpane of tabpaneList) {
      let tabpaneTop = 0;
      if (tabpane && tabpane.getBoundingClientRect && tabpane.getBoundingClientRect().top) {
        tabpaneTop = tabpane.getBoundingClientRect().top;
      }

      if (tabpane) {
        let topOffset = tabpaneTop + this._offset;
        tabpane.style.height = `calc(100vh - ${topOffset}px)`;
        tabpane.style["overflow-y"] = "auto"; // 自动出竖向滚动条
      }
    }
  }

  @Input()
  set nsAutoHeightTabset(v: any) {
    let value = parseInt(v);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
