import {
  Component,
  Directive,
  ElementRef,
  Input,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { STComponent } from '@delon/abc/st';

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" nsAutoHeightST></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st nsAutoHeightST="100"></st>
 */
@Directive({
  selector: '[nsAutoHeightST]',
  host: {},
})
export class NsAutoHeightSTDirective {
  @Input('nsAutoHeightST')
  offset: number;

  constructor(
    private element: ElementRef,
    private table: STComponent,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  /**
   * 响应浏览器窗体大小变化
   * @param event
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
      const offset = this.offset || 70;
      if (
        this.element &&
        this.element.nativeElement &&
        this.element.nativeElement.parentElement &&
        this.element.nativeElement.parentElement.offsetHeight
      ) {
        if (this.table && this.table.scroll && this.table.scroll.x) {
          this.table.scroll = {
            y:
              (
                this.element.nativeElement.parentElement.offsetHeight -
                this.element.nativeElement.offsetTop -
                offset
              ).toString() + 'px',
            x: this.table.scroll.x,
          };
          this.cd.detectChanges();
        } else {
          this.table.scroll = {
            y:
              (
                this.element.nativeElement.parentElement.offsetHeight -
                this.element.nativeElement.offsetTop -
                offset
              ).toString() + 'px',
          };
          this.cd.detectChanges();
        }
      }
    }, 10);
  }
}
