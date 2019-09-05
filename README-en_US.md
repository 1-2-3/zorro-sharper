# ZORRO Sharper

> Light-weight directives that power up ng-zorro-antd.

[![](https://img.shields.io/npm/v/zorro-sharper)](https://www.npmjs.com/package/zorro-sharper)
[![GitHub](https://img.shields.io/github/license/1-2-3/zorro-sharper)](https://github.com/1-2-3/zorro-sharper#License)
[![npm bundle size](https://img.shields.io/bundlephobia/min/zorro-sharper)](https://img.shields.io/bundlephobia/min/zorro-sharper)

Enhance and simplify [NG-ZORRO](https://github.com/NG-ZORRO/ng-zorro-antd) in a lightweight way.

English | [简体中文](README.md)

## Features

- Adaptive height card and DIV
- Adaptive height tab
- Adaptive height table
- Simplified drop-down box physical pagination
- Drop-down box auto assignment
- Simplify form validation

<img src="src/assets/auto-height-card.gif" width = '500px'/>

## Installation

```sh
npm install zorro-sharper --save
```

## Usage

Import the ZorroSharperModule into every module where you want to use the directives.

```ts
Import { NgModule } from "@angular/core";
Import { NgZorroAntdModule } from "ng-zorro-antd";
Import { ZorroSharperModule } from "zorro-sharper";

@NgModule({
  Imports: [NgZorroAntdModule, ZorroSharperModule],
  Declarations: [],
  Exports: []
})
Export class DirectiveDemoModule {}
```

Use directives and components where needed.

```html
<nz-card nsAutoHeightCard nzHoverable nzTitle="Adaptive Height Card">
  <p>
    Just add the "nsAutoHeightCard" directive to extend the bottom of the nz-card to the bottom of
    the page.
  </p>
</nz-card>
```

## License

MIT
