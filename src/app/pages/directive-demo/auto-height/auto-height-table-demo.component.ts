import { Component, OnInit } from "@angular/core";
import { Data } from "@angular/router";
import { STColumn, STColumnButton, STColumnBadge, STColumnTag } from "@delon/abc";

// const BADGE: STColumnBadge = {
//   1: { text: "成功", color: "success" },
//   2: { text: "错误", color: "error" },
//   3: { text: "进行中", color: "processing" },
//   4: { text: "默认", color: "default" },
//   5: { text: "警告", color: "warning" }
// };
// const TAG: STColumnTag = {
//   1: { text: "成功", color: "green" },
//   2: { text: "错误", color: "red" },
//   3: { text: "进行中", color: "blue" },
//   4: { text: "默认", color: "" },
//   5: { text: "警告", color: "orange" }
// };
// const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

@Component({
  selector: "app-auto-height-table-demo",
  templateUrl: "./auto-height-table-demo.component.html",
  styles: [
    `
      .operate {
        margin-bottom: 16px;
      }

      .operate span {
        margin-left: 8px;
      }
    `
  ]
})
export class AutoHeightTableDemoComponent implements OnInit {
  constructor() {}

  isAllDisplayDataChecked = false;
  isOperating = false;
  isIndeterminate = false;
  listOfDisplayData: Data[] = [];
  listOfAllData: Data[] = [];
  mapOfCheckedId: { [key: string]: boolean } = {};
  numberOfChecked = 0;

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData
        .filter(item => !item.disabled)
        .some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length;
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData
      .filter(item => !item.disabled)
      .forEach(item => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  operateData(): void {
    this.isOperating = true;
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false));
      this.refreshStatus();
      this.isOperating = false;
    }, 1000);
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        disabled: i % 2 === 0
      });
    }

    // this.reload();
  }

  // 以下是 ng-alain 的 st 表格数据
  // users: any[] = [];
  // columns: STColumn[] = [
  //   { title: "行号", type: "no" },
  //   { title: "姓名", index: "name" },
  //   { title: "年龄", index: "age", type: "number" },
  //   { title: "tag", index: "tag", type: "tag", tag: TAG },
  //   { title: "badge", index: "badge", type: "badge", badge: BADGE },
  //   { title: "yn", index: "yn", type: "yn" }
  // ];

  // reload() {
  //   this.users = Array(60)
  //     .fill({})
  //     .map((_item: any, idx: number) => {
  //       return {
  //         id: idx + 1,
  //         name: `name ${idx + 1}`,
  //         age: r(10, 50),
  //         tag: r(1, 5),
  //         badge: r(1, 5),
  //         yn: [true, false][r(1, 5) % 2]
  //       };
  //     });
  // }
}
