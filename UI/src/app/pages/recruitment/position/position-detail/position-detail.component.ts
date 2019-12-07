import { Component, OnInit } from "@angular/core";
import { RecruitmentService } from "src/app/services/recruitment.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Position } from "../position";

@Component({
  selector: "app-position-detail",
  templateUrl: "./position-detail.component.html",
  styleUrls: ["./position-detail.component.scss"]
})
export class PositionDetailComponent implements OnInit {
  position: Position;
  id: string;

  constructor(
    private recruitmentService: RecruitmentService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.recruitmentService.getJob(this.id).subscribe((res: any) => {
      // console.log(res);
      this.position = new Position(res);
    });
  }
}
