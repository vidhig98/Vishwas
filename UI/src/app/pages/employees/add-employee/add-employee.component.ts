import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeesService } from "../../../services/employees.service";
import { Employee } from "../employee/employee";
import { CustomValidators } from "ngx-custom-validators";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: FormGroup;
  editMode: boolean;
  employeeID: string;
  msg: string;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check if in Edit Mode
    this.route.data.subscribe(data => {
      this.editMode = data.editMode;
    });

    // If not in Edit Mode
    this.addEmployeeForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      gender: new FormControl("male", Validators.required),
      department: new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      dob: new FormControl(null, [Validators.required, CustomValidators.date]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        CustomValidators.number
      ]),
      personal_email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      work_email: new FormControl(null, [Validators.required, Validators.email])
    });

    // If in Edit Mode
    if (this.editMode) {
      // Get Employee ID from url
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.employeeID = params.get("id");
      });

      // Get Employee details from Server and prefill the form
      this.employeesService
        .getEmployee(this.employeeID)
        .subscribe((emp: Employee) => {
          // console.log(new Date(emp.dob));
          let dob: Date | string = new Date(emp.dob);
          dob = `${dob.getFullYear()}-${this.appendLeadingZeroes(
            dob.getUTCMonth() + 1
          )}-${this.appendLeadingZeroes(dob.getDate())}`;
          // console.log(dob);
          this.addEmployeeForm.setValue({
            first_name: emp.first_name,
            last_name: emp.last_name,
            gender: emp.gender,
            department: emp.department,
            designation: emp.designation,
            dob: dob,
            phone: emp.phone,
            personal_email: emp.personal_email,
            work_email: emp.work_email
          });
        });
    }
  }

  appendLeadingZeroes(n: number) {
    if (n < 10) {
      return `0${n}`;
    }
    return n;
  }

  onSubmit() {
    if (this.editMode) {
      this.employeesService
        .updateEmployee(this.employeeID, this.addEmployeeForm.value)
        .subscribe(
          (res: any) => {
            this.msg = res.message;
          },
          err => {
            this.msg = err.error.message;
          }
        );
    } else {
      this.employeesService.addEmployee(this.addEmployeeForm.value).subscribe(
        (res: any) => {
          this.msg = res.message;
          this.addEmployeeForm.reset();
        },
        err => {
          this.msg = err.error.message;
        }
      );
    }
  }
}
