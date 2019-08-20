# ZORRO Sharper

> 针对 ng-zorro-antd 组件库的轻量级增强指令、组件集。

[![](https://img.shields.io/npm/v/zorro-sharper)](https://www.npmjs.com/package/zorro-sharper)

使用超级轻量化的方式来增强、简化 [ZORRO 组件](https://github.com/NG-ZORRO/ng-zorro-antd)。

## 安装

```sh
npm install zorro-sharper --save
```

## 使用

在每一个需要使用组件的 module 中引入 ZorroSharperModule。

```ts
import { NgModule } from "@angular/core";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { ZorroSharperModule } from "zorro-sharper";

@NgModule({
  imports: [NgZorroAntdModule, ZorroSharperModule],
  declarations: [],
  exports: []
})
export class DirectiveDemoModule {}
```

在需要的地方使用指令或组件。

```ts
<nz-card nsAutoHeightCard nzHoverable nzTitle="自适应高度卡片">
  <p>只需添加 “nsAutoHeightCard” 指令即可让 nz-card 底部延展到页面底部.</p>
</nz-card>
```
