import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ZorroSharperModule } from "../../../../projects/zorro-sharper/src/lib/zorro-sharper.module";

import { DirectiveDemoRoutingModule } from "./directive-demo-routing.module";

import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";

@NgModule({
  imports: [DirectiveDemoRoutingModule, NgZorroAntdModule, ZorroSharperModule],
  declarations: [AutoHeightCardDemoComponent],
  exports: [AutoHeightCardDemoComponent]
})
export class DirectiveDemoModule {}
