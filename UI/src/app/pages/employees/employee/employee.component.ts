import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "./employee";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Input() id: string;

  constructor() {}

  ngOnInit() {}
}
