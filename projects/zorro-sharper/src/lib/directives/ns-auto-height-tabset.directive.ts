import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { NzTabSetComponent } from 'ng-zorro-antd/tabs';

/**
 * 自适应页面高度的标签页。
 * 将此指令放置到标签页组件上，组件高度即可自适应页面高度，例：<nz-tabset nsAutoHeightTabset>
 * 如果希望修改底部间距，可设置自定义间距值，例：<nz-card nsAutoHeightTabset="100">
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsAutoHeightTabset]',
})
export class NsAutoHeightTabsetDirective implements OnInit, AfterViewInit, OnDestroy {
  private _offset = 27;
  private resizeTimer: any = null;
  private cachedTabpanes: NodeListOf<Element> | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2, private cmp: NzTabSetComponent) {}

  ngOnInit() {
    if (this.cmp && this.cmp.nzSelectChange) {
      this.cmp.nzSelectChange.subscribe((index, tab) => {
        // Invalidate cache when switching tabs as the DOM structure might have changed
        this.cachedTabpanes = null;
        this.resetHeightOfTabs();
      });
    }
  }

  ngAfterViewInit() {
    this.resetHeightOfTabs();
  }

  ngOnDestroy() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
  }

  /**
   * 响应浏览器窗体大小变化
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    // Debounce resize events to avoid excessive calculations
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    this.resizeTimer = setTimeout(() => {
      this.resetHeightOfTabs();
    }, 150);
  }

  private resetHeightOfTabs() {
    requestAnimationFrame(() => {
      const tabset = this.el.nativeElement;
      // Cache tabpanes to avoid repeated querySelectorAll calls
      if (!this.cachedTabpanes) {
        this.cachedTabpanes = tabset.querySelectorAll('.ant-tabs-tabpane');
      }
      const tabpaneList = this.cachedTabpanes;

      for (const tabpane of tabpaneList) {
        let tabpaneTop = 0;
        if (tabpane && tabpane.getBoundingClientRect && tabpane.getBoundingClientRect().top) {
          tabpaneTop = tabpane.getBoundingClientRect().top;
        }

        if (tabpane) {
          const topOffset = tabpaneTop + this._offset;
          (tabpane as HTMLElement).style.height = `calc(100vh - ${topOffset}px)`;
          (tabpane as HTMLElement).style['overflow-y'] = 'auto'; // 自动出竖向滚动条
        }
      }
    });
  }

  @Input()
  set nsAutoHeightTabset(v: any) {
    const value = parseInt(v, 0);
    if (!isNaN(value) && value >= 0) {
      this._offset = value;
    }
  }
}
