import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { ProductionService } from "src/app/services/production.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Position } from "../product/product";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"]
})
export class AddProductComponent implements OnInit {
  addPositionForm: FormGroup;
  msg: string;
  editMode: boolean;
  productionID: string;

  constructor(
    private productionService: ProductionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });
    this.addPositionForm = new FormGroup({
      machine_no: new FormControl(null, Validators.required),
      customer: new FormControl(null, Validators.required),
      UIN: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      width: new FormControl(null, [Validators.required,CustomValidators.number]),
      length: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
       expected_rolls: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      actual_rolls: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      sq_mtr: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ])
    });

    // If in Edit Mode
    if (this.editMode) {
      // Get Job ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.productionID = params.get("id");
      });

      // Get Job details from Server and prefill the form
      this.productionService.getProduction(this.productionID).subscribe((production: Position) => {
        this.addPositionForm.setValue({
          machine_no: production.machine_no,
          customer: production.customer,
          UIN: production.UIN,
          width: production.width,
          length: production.length,
          expected_rolls: production.expected_rolls,
          actual_rolls: production.actual_rolls,
          sq_mtr: production.sq_mtr
        });
      });
    }
  }

  onSubmit() {
    // console.log(this.addPositionForm);
    if (this.editMode) {
      this.productionService
        .updateProduction(this.productionID, this.addPositionForm.value)
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
        this.productionService.addProduction(this.addPositionForm.value).subscribe(
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
