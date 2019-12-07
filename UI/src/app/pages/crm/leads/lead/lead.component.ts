import { Component, OnInit, Input } from "@angular/core";
import { Lead } from "./lead";

@Component({
  selector: "app-lead",
  templateUrl: "./lead.component.html",
  styleUrls: ["./lead.component.scss"]
})
export class LeadComponent implements OnInit {
  @Input() lead: Lead;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
