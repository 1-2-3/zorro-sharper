import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";
import { AutoHeightTableDemoComponent } from "./auto-height/auto-height-table-demo.component";

const routes: Routes = [
  { path: "auto-height-card-demo", component: AutoHeightCardDemoComponent },
  { path: "auto-height-table-demo", component: AutoHeightTableDemoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveDemoRoutingModule {}
