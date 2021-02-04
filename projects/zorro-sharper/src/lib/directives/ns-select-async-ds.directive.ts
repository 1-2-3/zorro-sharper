import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify
} from '@angular/core';
import { NzFormItemComponent, NzFormControlComponent } from 'ng-zorro-antd/form';
import { FormControl } from '@angular/forms';

/**
 * 异步下拉框数据源指令
 */
@Directive({
  selector: '[nsSelectAsyncDs]'
})
export class NsSelectAsyncDsDirective {
  private _context: Context = new Context();
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

  private _updateView() {
    this._viewRef = this._viewContainer.createEmbeddedView(this._templateRef, this._context);
  }
}

class Context {
  public $implicit: any = null;
}
