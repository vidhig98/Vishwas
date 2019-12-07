import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { RecruitmentService } from "src/app/services/recruitment.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Position } from "../position/position";

@Component({
  selector: "app-add-position",
  templateUrl: "./add-position.component.html",
  styleUrls: ["./add-position.component.scss"]
})
export class AddPositionComponent implements OnInit {
  addPositionForm: FormGroup;
  msg: string;
  editMode: boolean;
  jobID: string;

  constructor(
    private recruitmentService: RecruitmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });
    this.addPositionForm = new FormGroup({
      profile: new FormControl(null, Validators.required),
      department: new FormControl(null, Validators.required),
      salary: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      qualification: new FormControl(null, Validators.required),
      experience: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      openings: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ])
    });

    // If in Edit Mode
    if (this.editMode) {
      // Get Job ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.jobID = params.get("id");
      });

      // Get Job details from Server and prefill the form
      this.recruitmentService.getJob(this.jobID).subscribe((job: Position) => {
        this.addPositionForm.setValue({
          profile: job.profile,
          department: job.department,
          salary: job.salary,
          qualification: job.qualification,
          experience: job.experience,
          openings: job.openings
        });
      });
    }
  }

  onSubmit() {
    // console.log(this.addPositionForm);
    if (this.editMode) {
      this.recruitmentService
        .updateJob(this.jobID, this.addPositionForm.value)
        .subscribe(
          (res: any) => {
            this.msg = res.message;
          },
          err => {
            this.msg = err.error.message;
          }
        );
    } else {
      if (this.addPositionForm.valid) {
        this.recruitmentService.addJob(this.addPositionForm.value).subscribe(
          (res: any) => {
            // console.log(res);
            this.msg = res.message;
          },
          err => {
            console.error(err.error.message);
          }
        );
      }
    }
  }
}
