import { Component, Directive, ElementRef, Input, ViewContainerRef, Renderer } from "@angular/core";
import { STComponent } from "@delon/abc";

/**
 * 根据SimpleTable内部Top位置，自动计算Scroll.height，达到自动出内部滚动条的效果。
 * 例：<st #itemTable [data]="itemDataUrl" [columns]="columns" nsAutoHeightST></st>
 * 注意 SimpleTable 要放置到Card或其他容器里。
 * 需要自定义偏移量时，可使用：<st nsAutoHeightST="100"></st>
 */
@Directive({
  selector: "[nsAutoHeightST]",
  host: {}
})
export class NsAutoHeightSTDirective {
  @Input("nsAutoHeightST")
  offset: number;

  constructor(
    private element: ElementRef,
    private table: STComponent,
    private container: ViewContainerRef,
    private renderer: Renderer
  ) {
    setTimeout(() => {
      let offset = this.offset || 70;
      if (
        element &&
        element.nativeElement &&
        element.nativeElement.parentElement &&
        element.nativeElement.parentElement.offsetHeight
      ) {
        if (table && table.scroll && table.scroll.x) {
          table.scroll = {
            y:
              (
                element.nativeElement.parentElement.offsetHeight -
                element.nativeElement.offsetTop -
                offset
              ).toString() + "px",
            x: table.scroll.x
          };
        } else {
          table.scroll = {
            y:
              (
                element.nativeElement.parentElement.offsetHeight -
                element.nativeElement.offsetTop -
                offset
              ).toString() + "px"
          };
        }
      }
    }, 0);
  }

  ngOnInit() {}
}
