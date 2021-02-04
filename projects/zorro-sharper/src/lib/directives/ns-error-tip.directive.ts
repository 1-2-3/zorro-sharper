import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify,
  ElementRef,
  ComponentFactoryResolver,
  Type,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NgTemplateOutlet } from '@angular/common';
import { NsFormErrorTipsComponent } from '../components/ns-form-error-tips.component';

/**
 * 自动附加验证错误信息模板
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[nsErrorTip]',
})
export class NsErrorTipDirective implements OnInit {
  constructor(
    private viewContainer: ViewContainerRef,
    private formControl: NzFormControlComponent,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NsFormErrorTipsComponent);
    const componentRef = this.viewContainer.createComponent(componentFactory);
    const errorTpl = (componentRef.instance as NsFormErrorTipsComponent).errorTpl;
    this.formControl.nzErrorTip = errorTpl;
  }
}
