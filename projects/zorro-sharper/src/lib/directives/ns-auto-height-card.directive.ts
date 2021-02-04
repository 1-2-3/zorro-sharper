import { Directive, ElementRef, Input, Renderer2, HostListener, OnInit, AfterViewInit } from '@angular/core';

/**
 * 自适应页面高度的Card。
 * 将此指令放置到 Card 组件上，Card组件高度即可自适应页面高度，例：<nz-card nsAutoHeightCard>
 * 可设置自定义间距值，例：<nz-card nsAutoHeightCard="100">
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsAutoHeightCard]',
})
export class NsAutoHeightCardDirective implements OnInit, AfterViewInit {
  private _offset = 27;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  /**
   * 响应浏览器窗体大小变化
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.doAutoSize();
  }

  ngAfterViewInit() {
    this.doAutoSize();
  }

  private doAutoSize() {
    setTimeout(() => {
      const card = this.el.nativeElement;
      const bodyDiv = card.querySelector('.ant-card-body');
      let bodyTop = 0;
      if (bodyDiv && bodyDiv.getBoundingClientRect && bodyDiv.getBoundingClientRect().top) {
        bodyTop = bodyDiv.getBoundingClientRect().top;
      }

      if (bodyDiv) {
        const topOffset = bodyTop + this._offset;
        bodyDiv.style.height = `calc(100vh - ${topOffset}px)`;
        bodyDiv.style['overflow-y'] = 'auto'; // 自动出竖向滚动条
      }
    }, 2);
  }

  @Input()
  set nsAutoHeightCard(v: any) {
    const value = parseInt(v, 0);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
