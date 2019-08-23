import { NgModule } from "@angular/core";
import { NsAutoHeightCardDirective } from "./directives/ns-auto-height-card.directive";
import { NsAutoHeightDivDirective } from "./directives/ns-auto-height-div.directive";
import { NsAutoHeightTableDirective } from "./directives/ns-auto-height-table.directive";
import { NsSelectAsyncDsDirective } from "./directives/ns-select-async-ds.directive";
import { NsSelectTextFieldDirective } from "./directives/ns-select-text-field.directive";

const DIRECTIVES = [
  NsAutoHeightCardDirective,
  NsAutoHeightDivDirective,
  NsAutoHeightTableDirective,
  NsSelectAsyncDsDirective,
  NsSelectTextFieldDirective
];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES]
})
export class ZorroSharperModule {}
