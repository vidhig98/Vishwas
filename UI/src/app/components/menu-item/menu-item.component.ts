import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-menu-item",
  templateUrl: "./menu-item.component.html",
  styleUrls: ["./menu-item.component.scss"]
})
export class MenuItemComponent implements OnInit {
  @Input() menu_item: { background: string; name: string; route: string };

  constructor() {}

  ngOnInit() {}
}
