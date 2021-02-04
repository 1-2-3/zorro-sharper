import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { NZ_I18N, zh_CN } from "ng-zorro-antd/i18n";
import { NZ_ICONS } from "ng-zorro-antd/icon";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { NsFormErrorTipService } from "projects/zorro-sharper/src/public-api";
// import { NsFormErrorTipService } from "zorro-sharper";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzIconModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private errorTipService: NsFormErrorTipService) {
    errorTipService.registerErrorType({
      errorType: "required",
      defaultMessage: "必填项",
    });
    errorTipService.registerErrorType({
      errorType: "isInt",
      defaultMessage: "必须是整数",
    });
    errorTipService.registerErrorType({
      errorType: "greateEqual",
      defaultMessage: "",
    });
  }
}
