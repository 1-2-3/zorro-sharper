import { Component, OnInit } from "@angular/core";
import { NsAutoHeightCardDirective } from "projects/zorro-sharper/src/lib/directives/ns-auto-height-card.directive";

@Component({
  selector: "app-auto-height-card-demo",
  templateUrl: "./auto-height-card-demo.component.html"
})
export class AutoHeightCardDemoComponent implements OnInit {
  constructor() {
    NsAutoHeightCardDirective;
  }

  ngOnInit() {}
}
