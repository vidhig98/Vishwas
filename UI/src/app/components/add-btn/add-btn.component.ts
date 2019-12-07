import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-add-btn",
  templateUrl: "./add-btn.component.html",
  styleUrls: ["./add-btn.component.scss"]
})
export class AddBtnComponent implements OnInit {
  @Input() content: string = "";

  constructor() {}

  ngOnInit() {}
}
