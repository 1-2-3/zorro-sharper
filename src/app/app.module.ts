import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { NgZorroAntdModule, NZ_I18N, zh_CN, NZ_ICONS } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { NsFormErrorTipService } from "projects/zorro-sharper/src/public-api";
// import { NsFormErrorTipService } from "zorro-sharper";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private errorTipService: NsFormErrorTipService) {
    errorTipService.registerErrorType({ errorType: "required", defaultMessage: "必填项" });
    errorTipService.registerErrorType({ errorType: "isInt", defaultMessage: "必须是整数" });
    errorTipService.registerErrorType({ errorType: "greateEqual", defaultMessage: "" });
  }
}
