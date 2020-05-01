import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
} from "@angular/core";

/**
 * 自适应页面高度的Card。
 * 将此指令放置到 Card 组件上，Card组件高度即可自适应页面高度，例：<nz-card nsAutoHeightCard>
 * 可设置自定义间距值，例：<nz-card nsAutoHeightCard="100">
 */
@Directive({
  selector: "[nsAutoHeightCard]",
})
export class NsAutoHeightCardDirective {
  private _offset = 27;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  /**
   * 响应浏览器窗体大小变化
   * @param event
   */
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.doAutoSize();
  }

  ngAfterViewInit() {
    this.doAutoSize();
  }

  private doAutoSize() {
    setTimeout(() => {
      let card = this.el.nativeElement;
      let bodyDiv = card.querySelector(".ant-card-body");
      let bodyTop = 0;
      if (
        bodyDiv &&
        bodyDiv.getBoundingClientRect &&
        bodyDiv.getBoundingClientRect().top
      ) {
        bodyTop = bodyDiv.getBoundingClientRect().top;
      }

      if (bodyDiv) {
        let topOffset = bodyTop + this._offset;
        bodyDiv.style.height = `calc(100vh - ${topOffset}px)`;
        bodyDiv.style["overflow-y"] = "auto"; // 自动出竖向滚动条
      }
    }, 2);
  }

  @Input()
  set nsAutoHeightCard(v: any) {
    let value = parseInt(v);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
