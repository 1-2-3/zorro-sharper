import {
  Directive,
  TemplateRef,
  EmbeddedViewRef,
  ViewContainerRef,
  Input,
  Renderer2,
  AfterViewInit,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * 3D翻转卡片
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsFlipH],[nsFlipV]',
})
export class NsFlipDirective implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private _viewContainer: ViewContainerRef,
    private _templateRef: TemplateRef<void>,
    private _renderer: Renderer2,
  ) {
    this._onResize$.pipe(debounceTime(100)).subscribe(() => {
      // 将背面的位置和大小设置成与正面相同
      if (this._frontDiv && this._frontDiv.getBoundingClientRect) {
        const frontBound = this._frontDiv.getBoundingClientRect();
        const backBound = this._backDiv.getBoundingClientRect();

        if (frontBound.height !== backBound.height) {
          this._renderer.setStyle(this._backDiv, 'height', `${frontBound.height}px`);
          this._renderer.setStyle(this._backDiv, 'margin-top', `-${frontBound.height}px`);
        }
      }
    });
  }

  @Input('nsFlipH')
  set backTpl(backTpl: TemplateRef<void>) {
    this._flipType = 'Horizontal';
    this._backTpl = backTpl;
  }
  @Input('nsFlipV')
  set backTpl2(backTpl: TemplateRef<void>) {
    this._flipType = 'Vertical';
    this._backTpl = backTpl;
  }
  private _container: EmbeddedViewRef<void> | null = null;
  private _flipDeAngle = 0;
  private _backViewRef: EmbeddedViewRef<void> | null = null;
  private _onResize$ = new Subject<void>();
  private _backTpl: TemplateRef<void> = null;
  private _flipType: 'Horizontal' | 'Vertical' = 'Horizontal';
  private _resizeObserver: ResizeObserver | null = null;

  private _senceDiv = null;
  private _cardDiv = null;
  private _frontDiv = null;
  private _backDiv = null;
  private _frontView = null;

  ngOnInit() {
    this._updateView();
  }

  ngOnDestroy(): void {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
    }
    this._onResize$.complete();
  }

  ngAfterViewInit(): void {
    // 设置点击事件
    if (this._frontDiv && this._frontDiv.querySelector && this._frontDiv.querySelector('[nsFlipTrigger]')) {
      const trigger = this._frontDiv.querySelector('[nsFlipTrigger]');
      this._renderer.listen(trigger, 'click', (e) => {
        e.stopPropagation();
        this.flipCardH();
      });
    } else {
      this._renderer.listen(this._cardDiv, 'click', (e) => {
        e.stopPropagation();
        this.flipCardH();
      });
    }

    if (this._backDiv && this._backDiv.querySelector && this._backDiv.querySelector('[nsFlipTrigger]')) {
      const trigger = this._backDiv.querySelector('[nsFlipTrigger]');
      this._renderer.listen(trigger, 'click', (e) => {
        e.stopPropagation();
        this.flipCardH();
      });
    }

    // Use ResizeObserver instead of DoCheck for better performance
    this.setupResizeObserver();
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined' && this._frontDiv) {
      this._resizeObserver = new ResizeObserver(() => {
        // Check if element still exists before triggering resize
        if (this._frontDiv) {
          this._onResize$.next();
        }
      });
      this._resizeObserver.observe(this._frontDiv);
    }
  }

  private flipCardH() {
    this._flipDeAngle += 180;
    this._flipDeAngle %= 360;

    if (this._flipDeAngle === 0) {
      this._renderer.setStyle(this._frontDiv, 'pointer-events', `all`);
      this._renderer.setStyle(this._backDiv, 'pointer-events', `none`);
    } else {
      this._renderer.setStyle(this._frontDiv, 'pointer-events', `none`);
      this._renderer.setStyle(this._backDiv, 'pointer-events', `all`);
    }

    if (this._flipType === 'Horizontal') {
      this._renderer.setStyle(this._cardDiv, 'transform', `rotateY(${this._flipDeAngle}deg)`);
    } else {
      this._renderer.setStyle(this._cardDiv, 'transform', `rotateX(${this._flipDeAngle}deg)`);
    }
  }

  private _updateView() {
    const senceDiv = this._renderer.createElement('div'); // 最外层容器
    const cardDiv = this._renderer.createElement('div'); // 卡片容器
    const frontDiv = this._renderer.createElement('div'); // 卡片正面容器
    const backDiv = this._renderer.createElement('div'); // 卡片背面容器

    this._senceDiv = senceDiv;
    this._cardDiv = cardDiv;
    this._frontDiv = frontDiv;
    this._backDiv = backDiv;

    const frontView = this._viewContainer.createEmbeddedView(this._templateRef); // 正面内容
    const backView = this._viewContainer.createEmbeddedView(this._backTpl); // 背面内容

    this._frontView = frontView;

    // 组装容器结构
    if (
      this._viewContainer.element &&
      this._viewContainer.element.nativeElement &&
      this._viewContainer.element.nativeElement.parentElement
    ) {
      if (frontView && frontView.rootNodes && frontView.rootNodes.length) {
        this._renderer.appendChild(frontDiv, frontView.rootNodes[0]);
      }

      if (backView && backView.rootNodes && backView.rootNodes.length) {
        this._renderer.appendChild(backDiv, backView.rootNodes[0]);
      }

      this._renderer.appendChild(cardDiv, frontDiv);
      this._renderer.appendChild(cardDiv, backDiv);
      this._renderer.appendChild(senceDiv, cardDiv);

      this._renderer.appendChild(this._viewContainer.element.nativeElement.parentElement, senceDiv);
    }

    // 设置翻转样式
    this._renderer.setStyle(senceDiv, 'perspective', '800px');
    this._renderer.setStyle(cardDiv, 'transition', 'transform 0.65s');
    this._renderer.setStyle(cardDiv, 'transform-style', 'preserve-3d');
    this._renderer.setStyle(frontDiv, 'backface-visibility', 'hidden');
    this._renderer.setStyle(backDiv, 'backface-visibility', 'hidden');

    if (this._flipType === 'Horizontal') {
      this._renderer.setStyle(backDiv, 'transform', 'rotateY(180deg)');
    } else {
      this._renderer.setStyle(backDiv, 'transform', 'rotateX(180deg)');
    }
  }
}
