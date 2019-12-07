import { Component, OnInit } from "@angular/core";
import { RecruitmentService } from "src/app/services/recruitment.service";

@Component({
  selector: "app-recruitment",
  templateUrl: "./recruitment.component.html",
  styleUrls: ["./recruitment.component.scss"]
})
export class RecruitmentComponent implements OnInit {
  positions = [];

  constructor(private recruitmentService: RecruitmentService) {}

  ngOnInit() {
    this.recruitmentService.getJobs().subscribe((res: any) => {
      // console.log(res);
      this.positions = res;
    });
  }
}
