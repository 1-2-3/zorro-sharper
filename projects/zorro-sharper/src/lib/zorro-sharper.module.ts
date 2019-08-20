import { NgModule } from "@angular/core";
import { NsAutoHeightCardDirective } from "./directives/ns-auto-height-card.directive";
import { NsAutoHeightDivDirective } from "./directives/ns-auto-height-div.directive";

const DIRECTIVES = [NsAutoHeightCardDirective, NsAutoHeightDivDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [],
  exports: [...DIRECTIVES]
})
export class ZorroSharperModule {}
