import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { CrmService } from "src/app/services/crm.service";
import { ActivatedRoute, Params } from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"]
})
export class CustomerDetailComponent implements OnInit {
  customer: Customer;
  id: string;
  commentText: string;
  comments: any[] = [];

  constructor(private crmService: CrmService, private route: ActivatedRoute) {
    this.id = route.snapshot.params["id"];
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.crmService.getCustomer(this.id).subscribe((res: any) => {
      // console.log(res);
      let parsedRes = res[0]._id;
      if (_.isEmpty(res[0].comments[0])) {
        this.comments = [];
        parsedRes["comments"] = [];
      } else {
        this.comments = res[0].comments;
        parsedRes["comments"] = res[0].comments;
      }
      // console.log(parsedRes);
      this.customer = new Customer(parsedRes);
    });
  }

  postComment() {
    if (this.commentText.trim() != "") {
      this.crmService.addCustomerComment(this.id, this.commentText).subscribe(
        (res: any) => {
          // console.log(res);
          this.crmService.getCustomerComments(this.id).subscribe(
            (customerComments: any) => {
              // console.log(customerComments);
              this.comments = customerComments;
            },
            err => {
              console.error(err);
            }
          );
          this.commentText = "";
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
