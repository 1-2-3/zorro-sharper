import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { NsFlipDirective } from './ns-flip.directive';

/**
 * 标识使用按钮翻转卡片
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsFlipTrigger]',
})
export class NsFlipTriggerDirective {
  constructor() {}

  @Input()
  set nsFlipTrigger(v: any) {}
}
