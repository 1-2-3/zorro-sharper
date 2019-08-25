import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify,
  ElementRef,
  ComponentFactoryResolver,
  Type
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { NzFormControlComponent, NzEmptyComponent } from "ng-zorro-antd";
import { NgTemplateOutlet } from "@angular/common";
import { NsFormErrorTipsComponent } from "../components/ns-form-error-tips.component";

/**
 * 自动附加验证错误信息模板
 */
@Directive({
  selector: "[nsErrorTip]"
})
export class NsErrorTipDirective {
  constructor(
    private viewContainer: ViewContainerRef,
    private formControl: NzFormControlComponent,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      NsFormErrorTipsComponent
    );
    let componentRef = this.viewContainer.createComponent(componentFactory);
    var errorTpl = (<NsFormErrorTipsComponent>componentRef.instance).errorTpl;
    this.formControl.nzErrorTip = errorTpl;
  }
}
