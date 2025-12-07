import {
  Component,
  Directive,
  ElementRef,
  Input,
  SimpleChange,
  HostListener,
  ChangeDetectorRef,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Subscription } from 'rxjs';

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" ncSimpleTableAutoScroll></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st ncSimpleTableAutoScroll="100"></st>
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsAutoHeightTable]',
})
export class NsAutoHeightTableDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input('nsAutoHeightTable')
  offset: number;

  private resizeTimer: any = null;
  private pageIndexSubscription: Subscription | null = null;

  constructor(private element: ElementRef, private table: NzTableComponent<any>, private cd: ChangeDetectorRef) {
    // 当前页码改变时自动回到顶部
    if (this.table && this.table.nzPageIndexChange) {
      this.pageIndexSubscription = this.table.nzPageIndexChange.subscribe((index) => {
        const tableBody = this.element.nativeElement.querySelector('.ant-table-body');
        if (tableBody && tableBody.scrollTop) {
          tableBody.scrollTop = 0;
        }
      });
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
      this.doAutoSize();
    }, 150);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.doAutoSize();
  }

  ngOnDestroy() {
    if (this.resizeTimer) {
      clearTimeout(this.resizeTimer);
    }
    if (this.pageIndexSubscription) {
      this.pageIndexSubscription.unsubscribe();
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

        if (this.table && this.table.nzScroll) {
          const originNzScroll = this.table.nzScroll ? { ...this.table.nzScroll } : null;
          this.table.nzScroll = {
            ...this.table.nzScroll,
            y: calculatedHeight.toString() + 'px',
          };
          this.table.ngOnChanges({
            nzScroll: new SimpleChange({ originNzScroll }, this.table.nzScroll, false),
          });
          this.cd.detectChanges();
        }
      }
    });
  }
}
