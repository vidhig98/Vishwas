import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "../../employees/employee/employee";
import { AttendanceService } from "src/app/services/attendance.service";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-department",
  templateUrl: "./department.component.html",
  styleUrls: ["./department.component.scss"]
})
export class DepartmentComponent implements OnInit {
  @Input() name: string;
  @Input() used_for: string;
  employees: Employee[] = [];

  constructor(
    private attendanceService: AttendanceService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.departmentService.getDepartmentEmployees(this.name).subscribe(
      (res: Employee[]) => {
        this.employees = res;
        res.forEach(emp => {
          if (this.used_for == "mark-attendance") {
            this.attendanceService.attendance.push({
              user_id: emp._id,
              attendance: "absent",
              organization: emp.organization
            });
          }
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
