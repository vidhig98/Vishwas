import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-badged-menu-item",
  templateUrl: "./badged-menu-item.component.html",
  styleUrls: ["./badged-menu-item.component.scss"]
})
export class BadgedMenuItemComponent implements OnInit {
  @Input() menu_item: {
    background: string;
    name: string;
    route: string;
    badge: number;
  };

  constructor() {}

  ngOnInit() {}
}
