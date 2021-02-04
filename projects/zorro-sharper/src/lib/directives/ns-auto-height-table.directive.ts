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
} from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';

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
export class NsAutoHeightTableDirective implements OnInit, AfterViewInit {
  @Input('nsAutoHeightTable')
  offset: number;

  constructor(private element: ElementRef, private table: NzTableComponent, private cd: ChangeDetectorRef) {
    // 当前页码改变时自动回到顶部
    if (this.table && this.table.nzPageIndexChange) {
      this.table.nzPageIndexChange.subscribe((index) => {
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
    this.doAutoSize();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.doAutoSize();
  }

  private doAutoSize() {
    setTimeout(() => {
      const offset = this.offset || 70;
      if (
        this.element &&
        this.element.nativeElement &&
        this.element.nativeElement.parentElement &&
        this.element.nativeElement.parentElement.offsetHeight
      ) {
        if (this.table && this.table.nzScroll && this.table.nzScroll.x) {
          const originNzScroll = this.table.nzScroll ? { ...this.table.nzScroll } : null;
          this.table.nzScroll = {
            y:
              (
                this.element.nativeElement.parentElement.offsetHeight -
                this.element.nativeElement.offsetTop -
                offset
              ).toString() + 'px',
            x: this.table.nzScroll.x,
          };
          this.table.ngOnChanges({
            nzScroll: new SimpleChange({ originNzScroll }, this.table.nzScroll, false),
          });
          this.cd.detectChanges();
        } else {
          const originNzScroll = this.table.nzScroll ? { ...this.table.nzScroll } : null;
          this.table.nzScroll = {
            ...{
              y:
                (
                  this.element.nativeElement.parentElement.offsetHeight -
                  this.element.nativeElement.offsetTop -
                  offset
                ).toString() + 'px',
            },
          };

          this.table.ngOnChanges({
            nzScroll: new SimpleChange({ originNzScroll }, this.table.nzScroll, false),
          });
          this.cd.detectChanges();
        }
      }
    }, 10);
  }
}
