import { Directive, ElementRef, Input, Renderer2, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

/**
 * 自适应页面高度的Div。
 * 将此指令放置到 Div 组件上，Div组件高度即可自适应页面高度，例：<div ncFullHeightDiv>
 * 如果希望修改底部间距，可设置自定义间距值，例：<div ncFullHeightDiv="100">
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsAutoHeightDiv]',
})
export class NsAutoHeightDivDirective implements OnInit, AfterViewInit, OnDestroy {
  private _offset = 27;
  private divTop = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  /**
   * 响应浏览器窗体大小变化
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeToFitContent();
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      this.resizeToFitContent();
      this.setupResizeObserver();
    });
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    // Use ResizeObserver to detect when parent container size changes
    if (typeof ResizeObserver !== 'undefined' &&
        this.el &&
        this.el.nativeElement &&
        this.el.nativeElement.parentElement) {
      this.resizeObserver = new ResizeObserver(() => {
        // Verify parent still exists before resizing
        if (this.el && this.el.nativeElement && this.el.nativeElement.parentElement) {
          this.resizeToFitContent();
        }
      });
      this.resizeObserver.observe(this.el.nativeElement.parentElement);
    }
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
      div.style['overflow-y'] = 'auto';
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
