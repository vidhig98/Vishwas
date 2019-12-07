import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomValidators } from "ngx-custom-validators";
import { CrmService } from "src/app/services/crm.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Lead } from "../lead/lead";

@Component({
  selector: "app-add-lead",
  templateUrl: "./add-lead.component.html",
  styleUrls: ["./add-lead.component.scss"]
})
export class AddLeadComponent implements OnInit {
  addLeadForm: FormGroup;
  msg: string;
  editMode: boolean;
  leadID: string;

  constructor(private crmService: CrmService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Check if in Edit Mode
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });
    this.addLeadForm = new FormGroup({
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
      // Get Lead ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.leadID = params.get("id");
      });

      // Get Lead details from Server and prefill the form
      this.crmService.getLead(this.leadID).subscribe((lead: Lead) => {
        this.addLeadForm.setValue({
          company_name: lead.company_name,
          contact_person: lead.contact_person,
          phone: lead.phone,
          email: lead.email,
          website: lead.website,
          source: lead.source,
          order: lead.order
        });
      });
    }
  }

  onSubmit() {
    // console.log(this.addLeadForm);
    if (this.editMode) {
      this.crmService.updateLead(this.leadID, this.addLeadForm.value).subscribe(
        (res: any) => {
          this.msg = res.message;
        },
        err => {
          this.msg = err.error.message;
        }
      );
    } else {
      if (this.addLeadForm.valid) {
        this.crmService.addLead(this.addLeadForm.value).subscribe(
          (res: any) => {
            // console.log(res);
            this.msg = res.message;
            this.addLeadForm.reset();
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
