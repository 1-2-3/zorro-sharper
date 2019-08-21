import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
// import { ZorroSharperModule } from "zorro-sharper";
import { ZorroSharperModule } from "../../../../projects/zorro-sharper/src/lib/zorro-sharper.module";

import { DirectiveDemoRoutingModule } from "./directive-demo-routing.module";
import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";
import { AutoHeightTableDemoComponent } from "./auto-height/auto-height-table-demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule, DirectiveDemoRoutingModule, NgZorroAntdModule, ZorroSharperModule],
  declarations: [AutoHeightCardDemoComponent, AutoHeightTableDemoComponent]
})
export class DirectiveDemoModule {}
