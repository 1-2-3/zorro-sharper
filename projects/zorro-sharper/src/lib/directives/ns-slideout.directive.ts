import {
  Directive,
  Input,
  TemplateRef,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ViewChild,
  SimpleChanges,
  OnInit,
  OnChanges,
  AfterViewInit,
} from "@angular/core";
import { slideMotion } from "ng-zorro-antd";
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
} from "@angular/cdk/overlay";

@Directive({
  selector: "[nsSlideout]",
})
export class NsSlideoutDirective implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private elementRef: ElementRef,
    private hostView: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private renderer: Renderer2
  ) {}

  @Input("nsSlideoutContent")
  nsSlideoutContent: TemplateRef<void>;

  @Input() nsVisible: boolean;

  componentFactory: ComponentFactory<NsSlideoutComponent>;
  component: NsSlideoutComponent;

  ngOnInit() {
    this.componentFactory = this.resolver.resolveComponentFactory(
      NsSlideoutComponent
    );
  }

  ngAfterViewInit() {
    this.createComponent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.component) {
      this.updateChangedProperties();
    }
  }

  private createComponent(): void {
    const componentRef = this.hostView.createComponent(this.componentFactory);

    this.component = componentRef.instance;

    // Remove the component's DOM because it should be in the overlay container.
    this.renderer.removeChild(
      this.renderer.parentNode(this.elementRef.nativeElement),
      componentRef.location.nativeElement
    );
    this.component.setOverlayOrigin({ elementRef: this.elementRef });

    this.updateChangedProperties();
  }

  private updateChangedProperties() {
    this.updateComponentValue("nsSlideoutContent", this.nsSlideoutContent);
    this.updateComponentValue("nsVisible", this.nsVisible);

    this.component.updateByDirective();
  }

  private updateComponentValue(key: string, value: any): void {
    if (typeof value !== "undefined") {
      // @ts-ignore
      this.component[key] = value;
    }
  }
}

@Component({
  selector: "nsSlideoutCmp",
  animations: [slideMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="nsVisible"
      (positionChange)="onPositionChange($event)"
    >
      <div [@slideMotion]="slideMotionState">
        <ng-container *ngTemplateOutlet="nsSlideoutContent"></ng-container>
      </div>
    </ng-template>
  `,
})
export class NsSlideoutComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  nsSlideoutContent: TemplateRef<void>;
  origin: CdkOverlayOrigin;
  @ViewChild("overlay", { static: false }) overlay: CdkConnectedOverlay;
  @Input() nsVisible: boolean;
  slideMotionState = "top";

  updateByDirective(): void {
    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.updatePosition();
    });
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.slideMotionState = this.getSlideMotionState(position)!;
    this.cdr.detectChanges();
  }

  updatePosition(): void {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  getSlideMotionState(position: ConnectedOverlayPositionChange) {
    return position.connectionPair.overlayY === "bottom" ? "top" : "bottom";
  }
}
