import { Component, OnInit } from "@angular/core";
import { Lead } from "../lead";
import { CrmService } from "src/app/services/crm.service";
import { ActivatedRoute, Params } from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: "app-lead-detail",
  templateUrl: "./lead-detail.component.html",
  styleUrls: ["./lead-detail.component.scss"]
})
export class LeadDetailComponent implements OnInit {
  lead: Lead;
  id: string;
  commentText: string;
  comments: any[] = [];

  constructor(private crmService: CrmService, private route: ActivatedRoute) {
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.crmService.getLead(this.id).subscribe((res: any) => {
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
      this.lead = new Lead(parsedRes);
    });
  }

  postComment() {
    if (this.commentText.trim() != "") {
      this.crmService.addLeadComment(this.id, this.commentText).subscribe(
        (res: any) => {
          // console.log(res);
          this.crmService.getLeadComments(this.id).subscribe(
            (leadComments: any) => {
              // console.log(leadComments);
              this.comments = leadComments;
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
