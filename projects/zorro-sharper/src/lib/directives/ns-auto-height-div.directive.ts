import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnInit,
  AfterViewInit,
  DoCheck,
} from "@angular/core";

/**
 * 自适应页面高度的Div。
 * 将此指令放置到 Div 组件上，Div组件高度即可自适应页面高度，例：<div ncFullHeightDiv>
 * 如果希望修改底部间距，可设置自定义间距值，例：<div ncFullHeightDiv="100">
 */
@Directive({
  selector: "[nsAutoHeightDiv]",
})
export class NsAutoHeightDivDirective
  implements OnInit, AfterViewInit, DoCheck {
  private _offset = 27;
  private divTop = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  ngDoCheck(): void {
    const div = this.el.nativeElement;
    if (div && div.getBoundingClientRect && div.getBoundingClientRect().top) {
      const currentDivTop = div.getBoundingClientRect().top;

      if (this.divTop !== currentDivTop) {
        this.resizeToFitContent();
      }
    }
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.resizeToFitContent();
    });
  }

  private resizeToFitContent() {
    const div = this.el.nativeElement;
    this.divTop = 0;
    if (div && div.getBoundingClientRect && div.getBoundingClientRect().top) {
      this.divTop = div.getBoundingClientRect().top;
    }

    if (div) {
      const topOffset = this.divTop + this._offset;
      div.style.height = `calc(100vh - ${topOffset}px)`;
      div.style["overflow-y"] = "auto";
    }
  }

  @Input()
  set nsAutoHeightDiv(v: any) {
    const value = parseInt(v, 0);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
