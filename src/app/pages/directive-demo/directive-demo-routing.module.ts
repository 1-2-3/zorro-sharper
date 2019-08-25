import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";
import { AutoHeightTableDemoComponent } from "./auto-height/auto-height-table-demo.component";
import { SelectAsyncDsComponent } from "./select/select-async-ds.component";
import { SelectTextFieldComponent } from "./select/select-text-field.component";
import { FormErrorTipComponent } from "./form/form-error-tip.component";

const routes: Routes = [
  { path: "auto-height-card-demo", component: AutoHeightCardDemoComponent },
  { path: "auto-height-table-demo", component: AutoHeightTableDemoComponent },
  { path: "select-async-ds", component: SelectAsyncDsComponent },
  { path: "select-text-field", component: SelectTextFieldComponent },
  { path: "form-error-tip", component: FormErrorTipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectiveDemoRoutingModule {}
