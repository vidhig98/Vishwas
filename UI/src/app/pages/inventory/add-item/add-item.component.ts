import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { InventoryService } from "src/app/services/inventory.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Position } from "../item/item";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.component.html",
  styleUrls: ["./add-item.component.scss"]
})
export class AddItemComponent implements OnInit {
  addPositionForm: FormGroup;
  msg: string;
  editMode: boolean;
  inventoryID: string;

  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });
    this.addPositionForm = new FormGroup({
      item_name: new FormControl(null, Validators.required),
      party_name: new FormControl(null, Validators.required),
      UIN: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      width: new FormControl(null, [Validators.required,CustomValidators.number]),
      length: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
       GSM: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      sq_mtr: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      weight: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ]),
      impression: new FormControl(null,
        Validators.required)
    });

    // If in Edit Mode
    if (this.editMode) {
      // Get Job ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.inventoryID = params.get("id");
      });

      // Get Job details from Server and prefill the form
      this.inventoryService.getInventory(this.inventoryID).subscribe((inventory: Position) => {
        this.addPositionForm.setValue({
          item_name: inventory.item_name,
          party_name: inventory.party_name,
          UIN: inventory.UIN,
          width: inventory.width,
          length: inventory.length,
          GSM: inventory.GSM,
          sq_mtr: inventory.sq_mtr,
          weight: inventory.weight,
          impression: inventory.impression
        });
      });
    }
  }

  onSubmit() {
    // console.log(this.addPositionForm);
    if (this.editMode) {
      this.inventoryService
        .updateInventory(this.inventoryID, this.addPositionForm.value)
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
        this.inventoryService.addInventory(this.addPositionForm.value).subscribe(
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
