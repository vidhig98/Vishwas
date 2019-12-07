import { Component, OnInit } from "@angular/core";
import { CrmService } from "src/app/services/crm.service";
import { Lead } from "./lead/lead";

@Component({
  selector: "app-leads",
  templateUrl: "./leads.component.html",
  styleUrls: ["./leads.component.scss"]
})
export class LeadsComponent implements OnInit {
  leads: Lead[] = [];

  constructor(private crmService: CrmService) {}

  ngOnInit() {
    this.crmService.getLeads().subscribe(
      (res: any) => {
        // console.log(res);
        this.leads = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
