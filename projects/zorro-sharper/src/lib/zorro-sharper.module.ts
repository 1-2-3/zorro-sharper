import { NgModule } from "@angular/core";
import { NsAutoHeightCardDirective } from "./directives/ns-auto-height-card.directive";
import { NsAutoHeightDivDirective } from "./directives/ns-auto-height-div.directive";
import { NsAutoHeightTableDirective } from "./directives/ns-auto-height-table.directive";
import { NsSelectAsyncDsDirective } from "./directives/ns-select-async-ds.directive";
import { NsSelectTextFieldDirective } from "./directives/ns-select-text-field.directive";
import { NsFormErrorTipsComponent } from "./components/ns-form-error-tips.component";
import { NsErrorTipDirective } from "./directives/ns-error-tip.directive";
import { CommonModule } from "@angular/common";
import { NsAutoHeightSTDirective } from "./directives/ns-auto-height-st.directive";
import { NsAutoHeightTabsetDirective } from "./directives/ns-auto-height-tabset.directive";
import { NsAutoFeedbackDirective } from "./directives/ns-auto-feedback.directive";
import { NsFlipDirective } from "./directives/ns-flip.directive";
import { NsFlipTriggerDirective } from "./directives/ns-flip-trigger.directive";
import { NsFormLabelDirective } from "./directives/ns-form-label.directive";
import { NsFormItemDirective } from "./directives/ns-form-item.directive";
import { NsFormControlDirective } from "./directives/ns-form-control.directive";
import {
  NsSlideoutDirective,
  NsSlideoutComponent,
} from "./directives/ns-slideout.directive";
import { OverlayModule } from "@angular/cdk/overlay";

const DIRECTIVES = [
  NsAutoHeightCardDirective,
  NsAutoHeightDivDirective,
  NsAutoHeightTableDirective,
  NsSelectAsyncDsDirective,
  NsSelectTextFieldDirective,
  NsErrorTipDirective,
  NsAutoHeightSTDirective,
  NsAutoHeightTabsetDirective,
  NsAutoFeedbackDirective,
  NsFlipDirective,
  NsFlipTriggerDirective,
  NsFormLabelDirective,
  NsFormItemDirective,
  NsFormControlDirective,
  NsSlideoutDirective,
];

@NgModule({
  declarations: [...DIRECTIVES, NsFormErrorTipsComponent, NsSlideoutComponent],
  imports: [CommonModule, OverlayModule],
  exports: [...DIRECTIVES],
  entryComponents: [NsFormErrorTipsComponent, NsSlideoutComponent],
})
export class ZorroSharperModule {}
