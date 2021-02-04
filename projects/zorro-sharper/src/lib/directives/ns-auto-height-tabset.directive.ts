import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { NzTabSetComponent } from "ng-zorro-antd/tabs";

/**
 * 自适应页面高度的标签页。
 * 将此指令放置到标签页组件上，组件高度即可自适应页面高度，例：<nz-tabset nsAutoHeightTabset>
 * 如果希望修改底部间距，可设置自定义间距值，例：<nz-card nsAutoHeightTabset="100">
 */
@Directive({
  selector: "[nsAutoHeightTabset]",
})
export class NsAutoHeightTabsetDirective {
  private _offset = 27;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private cmp: NzTabSetComponent
  ) {}

  ngOnInit() {
    if (this.cmp && this.cmp.nzSelectChange) {
      this.cmp.nzSelectChange.subscribe((index, tab) => {
        this.resetHeightOfTabs();
      });
    }
  }

  ngAfterViewInit() {
    this.resetHeightOfTabs();
  }

  private resetHeightOfTabs() {
    setTimeout(() => {
      const tabset = this.el.nativeElement;
      const tabpaneList = tabset.querySelectorAll(".ant-tabs-tabpane");
      for (const tabpane of tabpaneList) {
        let tabpaneTop = 0;
        if (
          tabpane &&
          tabpane.getBoundingClientRect &&
          tabpane.getBoundingClientRect().top
        ) {
          tabpaneTop = tabpane.getBoundingClientRect().top;
        }

        if (tabpane) {
          const topOffset = tabpaneTop + this._offset;
          tabpane.style.height = `calc(100vh - ${topOffset}px)`;
          tabpane.style["overflow-y"] = "auto"; // 自动出竖向滚动条
        }
      }
    }, 2);
  }

  @Input()
  set nsAutoHeightTabset(v: any) {
    const value = parseInt(v);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
