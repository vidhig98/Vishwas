import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crm",
  templateUrl: "./crm.component.html",
  styleUrls: ["./crm.component.scss"]
})
export class CrmComponent implements OnInit {
  menuItems = [
    {
      background: "../../assets/img/leads.jpg",
      name: "Leads",
      route: "lead"
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Customers",
      route: "customer"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
