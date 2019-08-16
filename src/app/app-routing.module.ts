import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/directives/auto-height-card-demo" },
  {
    path: "directives",
    loadChildren: () =>
      import("./pages/directive-demo/directive-demo.module").then(m => m.DirectiveDemoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
