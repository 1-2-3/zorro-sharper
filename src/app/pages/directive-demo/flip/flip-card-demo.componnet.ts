import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-flip-card-demo",
  templateUrl: "./flip-card-demo.componnet.html"
})
export class FlipCardDemoComponnet implements OnInit {
  constructor() {}

  data = [
    {
      title: "Title 1"
    },
    {
      title: "Title 2"
    },
    {
      title: "Title 3"
    },
    {
      title: "Title 4"
    }
  ];

  ngOnInit() {}
}
