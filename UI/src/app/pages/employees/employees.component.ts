import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "../../services/employees.service";
import { Employee } from "./employee/employee";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"],
  providers: [EmployeesService]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeesService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.employees = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
