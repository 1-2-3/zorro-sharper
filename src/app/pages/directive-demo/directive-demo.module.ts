import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ZorroSharperModule } from "zorro-sharper";

import { DirectiveDemoRoutingModule } from "./directive-demo-routing.module";

import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";

@NgModule({
  imports: [DirectiveDemoRoutingModule, NgZorroAntdModule, ZorroSharperModule],
  declarations: [AutoHeightCardDemoComponent]
})
export class DirectiveDemoModule {}
