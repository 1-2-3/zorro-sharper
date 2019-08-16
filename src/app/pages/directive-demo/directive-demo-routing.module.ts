import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";

const routes: Routes = [{ path: "auto-height-card-demo", component: AutoHeightCardDemoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveDemoRoutingModule {}
