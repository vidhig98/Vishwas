import { Component, OnInit } from "@angular/core";
import { CrmService } from "src/app/services/crm.service";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.scss"]
})
export class CustomersComponent implements OnInit {
  customers = [];

  constructor(private crmService: CrmService) {}

  ngOnInit() {
    this.crmService.getCustomers().subscribe(
      (res: any) => {
        // console.log(res);
        this.customers = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
