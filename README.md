# ZORRO Sharper

> 针对 ng-zorro-antd 组件库的轻量级增强指令集。

[![](https://img.shields.io/npm/v/zorro-sharper)](https://www.npmjs.com/package/zorro-sharper)
[![GitHub](https://img.shields.io/github/license/1-2-3/zorro-sharper)](https://github.com/1-2-3/zorro-sharper#license)

使用超级轻量化的方式来增强、简化 [ZORRO 组件库](https://github.com/NG-ZORRO/ng-zorro-antd)。

[English](README-en_US.md) | 简体中文

## 特性

- 自适应高度的卡片和 DIV
- 自适应高度标签页
- 自适应高度的表格
- 简化下拉框物理分页
- 下拉框自动赋值
- 简化表单验证

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

```html
<nz-card nsAutoHeightCard nzHoverable nzTitle="自适应高度卡片">
  <p>只需添加 “nsAutoHeightCard” 指令即可让 nz-card 底部延展到页面底部.</p>
</nz-card>
```

## License

MIT
