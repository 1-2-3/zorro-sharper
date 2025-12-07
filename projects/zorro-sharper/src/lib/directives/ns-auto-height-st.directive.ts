import {
  Component,
  Directive,
  ElementRef,
  Input,
  HostListener,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { STComponent } from '@delon/abc/st';

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" nsAutoHeightST></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st nsAutoHeightST="100"></st>
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsAutoHeightST]',
})
export class NsAutoHeightSTDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('nsAutoHeightST')
  offset: number;

  private resizeTimer: any = null;

  constructor(private element: ElementRef, private table: STComponent, private cd: ChangeDetectorRef) {}

  ngOnInit() {}

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
      this.doAutoSize();
    }, 150);
  }

  ngAfterViewInit() {
    this.doAutoSize();
  }

  ngOnDestroy() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
  }

  private doAutoSize() {
    requestAnimationFrame(() => {
      const offset = this.offset || 70;
      if (
        this.element &&
        this.element.nativeElement &&
        this.element.nativeElement.parentElement &&
        this.element.nativeElement.parentElement.offsetHeight
      ) {
        const calculatedHeight =
          this.element.nativeElement.parentElement.offsetHeight -
          this.element.nativeElement.offsetTop -
          offset;

        if (this.table && this.table.scroll) {
          this.table.scroll = {
            ...this.table.scroll,
            y: calculatedHeight.toString() + 'px',
          };
          this.cd.detectChanges();
        }
      }
    });
  }
}
