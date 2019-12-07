import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { CrmService } from "src/app/services/crm.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Customer } from "../customer/customer";

@Component({
  selector: "app-add-customer",
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"]
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  msg: string;
  editMode: boolean;
  customerID: string;

  constructor(private crmService: CrmService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if in Edit Mode
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });
    this.addCustomerForm = new FormGroup({
      company_name: new FormControl(null, Validators.required),
      contact_person: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        CustomValidators.number
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      website: new FormControl(null, [
        Validators.required,
        CustomValidators.url
      ]),
      source: new FormControl(null, Validators.required),
      order: new FormControl(null, [
        Validators.required,
        CustomValidators.number
      ])
    });

    // If in Edit Mode
    if (this.editMode) {
      // Get Customer ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.customerID = params.get("id");
      });

      // Get Customer details from Server and prefill the form
      this.crmService
        .getCustomer(this.customerID)
        .subscribe((customer: Customer) => {
          this.addCustomerForm.setValue({
            company_name: customer.company_name,
            contact_person: customer.contact_person,
            phone: customer.phone,
            email: customer.email,
            website: customer.website,
            source: customer.source,
            order: customer.order
          });
        });
    }
  }

  onSubmit() {
    // console.log(this.addCustomerForm);
    if (this.editMode) {
      this.crmService
        .updateCustomer(this.customerID, this.addCustomerForm.value)
        .subscribe(
          (res: any) => {
            this.msg = res.message;
          },
          err => {
            this.msg = err.error.message;
          }
        );
    } else {
      if (this.addCustomerForm.valid) {
        this.crmService.addCustomer(this.addCustomerForm.value).subscribe(
          (res: any) => {
            // console.log(res);
            this.msg = res.message;
            this.addCustomerForm.reset();
          },
          err => {
            console.error(err);
            this.msg = err.error.message;
          }
        );
      }
    }
  }
}
