import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify,
  OnDestroy,
} from '@angular/core';
import { NzFormItemComponent, NzFormControlComponent } from 'ng-zorro-antd/form';
import { FormControl } from '@angular/forms';

class Context {
  public $implicit: any = null;
}

/**
 * 异步下拉框数据源指令
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsSelectAsyncDs]',
})
export class NsSelectAsyncDsDirective implements OnDestroy {
  private _context = new Context();
  private _templateRef: TemplateRef<Context> | null = null;
  private _viewRef: EmbeddedViewRef<Context> | null = null;

  constructor(private _viewContainer: ViewContainerRef, templateRef: TemplateRef<Context>) {
    this._templateRef = templateRef;
  }

  @Input('nsSelectAsyncDs')
  set ds(v: any) {
    this._context.$implicit = v;
    this._updateView();
  }

  ngOnDestroy() {
    if (this._viewRef) {
      this._viewRef.destroy();
      this._viewRef = null;
    }
  }

  private _updateView() {
    // Clear previous view if it exists to avoid memory leaks
    if (this._viewRef) {
      this._viewContainer.clear();
      this._viewRef = null;
    }
    this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef, this._context);
  }
}
