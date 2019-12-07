import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { AttendanceService } from "../../../services/attendance.service";

@Component({
  selector: "app-mark-attendance",
  templateUrl: "./mark-attendance.component.html",
  styleUrls: ["./mark-attendance.component.scss"]
})
export class MarkAttendanceComponent implements OnInit {
  departments: string[] = [];
  today: Date | String = new Date();
  msg: string;

  constructor(
    private employeesService: EmployeesService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit() {
    this.employeesService.getEmployees().subscribe(res => {
      res.forEach(emp => {
        if (this.departments.indexOf(emp.department) == -1) {
          this.departments.push(emp.department);
        }
      });
    });
  }

  onMarkAttendance() {
    this.attendanceService.markAttendance().subscribe(
      (res: any) => {
        // console.log(res.message);
        this.msg = res.message;
      },
      err => {
        // console.error(err);
        this.msg = err.error.message;
      }
    );
  }
}
