import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-slideout-demo",
  styleUrls: ["./slideout-demo.component.less"],
  templateUrl: "./slideout-demo.component.html",
})
export class SlideoutDemoComponent implements OnInit {
  constructor() {}

  visible = false;
  visible2 = false;

  ngOnInit() {}

  toggleVisible() {
    this.visible = !this.visible;
  }

  toggleVisible2() {
    this.visible2 = !this.visible2;
  }
}
