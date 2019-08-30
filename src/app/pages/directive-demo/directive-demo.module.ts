import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { DelonABCModule } from "@delon/abc";
import { ZorroSharperModule } from "zorro-sharper";
// import { ZorroSharperModule } from "../../../../projects/zorro-sharper/src/lib/zorro-sharper.module";

import { DirectiveDemoRoutingModule } from "./directive-demo-routing.module";
import { AutoHeightCardDemoComponent } from "./auto-height/auto-height-card-demo.component";
import { AutoHeightTableDemoComponent } from "./auto-height/auto-height-table-demo.component";
import { CommonModule } from "@angular/common";
import { SelectAsyncDsComponent } from "./select/select-async-ds.component";
import { SelectTextFieldComponent } from "./select/select-text-field.component";
import { FormErrorTipComponent } from "./form/form-error-tip.component";
import { AutoHeightTabsetDemoComponent } from "./auto-height/auto-height-tabset-demo.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectiveDemoRoutingModule,
    NgZorroAntdModule,
    DelonABCModule,
    ZorroSharperModule
  ],
  declarations: [
    AutoHeightCardDemoComponent,
    AutoHeightTableDemoComponent,
    SelectAsyncDsComponent,
    SelectTextFieldComponent,
    FormErrorTipComponent,
    AutoHeightTabsetDemoComponent
  ]
})
export class DirectiveDemoModule {}
