import { Component } from "@angular/core";
import { ValdemortConfig, DisplayMode } from "ngx-valdemort";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [ValdemortConfig]
})
export class AppComponent {
  constructor(private config: ValdemortConfig) {
    config.errorClasses = "msg";
    config.displayMode = DisplayMode.ONE;
  }
}
