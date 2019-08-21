import { Component, Directive, ElementRef, Input, ViewContainerRef, Renderer } from "@angular/core";
import { NzTableComponent } from "ng-zorro-antd";

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" ncSimpleTableAutoScroll></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st ncSimpleTableAutoScroll="100"></st>
 */
@Directive({
  selector: "[nsAutoHeightTable]",
  host: {}
})
export class NsAutoHeightTableDirective {
  @Input("nsAutoHeightTable")
  offset: number;

  constructor(
    private element: ElementRef,
    private table: NzTableComponent,
    private container: ViewContainerRef,
    private renderer: Renderer
  ) {
    setTimeout(() => {
      let offset = this.offset || 70;
      if (
        this.element &&
        this.element.nativeElement &&
        this.element.nativeElement.parentElement &&
        this.element.nativeElement.parentElement.offsetHeight
      ) {
        if (this.table && this.table.nzScroll && this.table.nzScroll.x) {
          this.table.nzScroll = {
            y:
              (
                this.element.nativeElement.parentElement.offsetHeight -
                this.element.nativeElement.offsetTop -
                offset
              ).toString() + "px",
            x: this.table.nzScroll.x
          };
        } else {
          this.table.nzScroll = {
            y:
              (
                this.element.nativeElement.parentElement.offsetHeight -
                this.element.nativeElement.offsetTop -
                offset
              ).toString() + "px"
          };
        }
      }
    }, 0);
  }

  ngOnInit() {}

  ngAfterViewInit() {}
}
