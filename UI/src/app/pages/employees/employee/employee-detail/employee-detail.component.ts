import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee";
import { EmployeesService } from "../../../../services/employees.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-employee-detail",
  templateUrl: "./employee-detail.component.html",
  styleUrls: ["./employee-detail.component.scss"]
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  id: string;

  constructor(
    private employeeService: EmployeesService,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.params["id"];
    route.params.subscribe((params: Params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.employeeService.getEmployee(this.id).subscribe(res => {
      this.employee = new Employee(res);
    });
  }
}
