import { Component, OnInit, Input } from "@angular/core";
import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"]
})
export class CustomerComponent implements OnInit {
  @Input() customer: Customer;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
