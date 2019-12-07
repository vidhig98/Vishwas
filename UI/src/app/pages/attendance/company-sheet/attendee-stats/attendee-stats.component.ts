import { Component, OnInit, Input } from "@angular/core";
import { Employee } from "src/app/pages/employees/employee/employee";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-attendee-stats",
  templateUrl: "./attendee-stats.component.html",
  styleUrls: ["./attendee-stats.component.scss"]
})
export class AttendeeStatsComponent implements OnInit {
  @Input() employee: Employee;
  presentCount: number | string;
  absentCount: number | string;

  constructor(private departmentService: DepartmentService) {}

  ngOnInit() {
    let employeeAttendanceData = this.departmentService.departmentEmployeesAttendance.find(
      emp => {
        return emp._id == this.employee._id;
      }
    );
    // console.log(employeeAttendanceData);
    if (employeeAttendanceData) {
      employeeAttendanceData = employeeAttendanceData.attendance;
      // console.log(employeeAttendanceData);
      if (employeeAttendanceData.length == 1) {
        if (employeeAttendanceData[0].status == "present") {
          this.presentCount = employeeAttendanceData[0].count;
          this.absentCount = "N/A";
        } else {
          this.absentCount = employeeAttendanceData[0].count;
          this.presentCount = "N/A";
        }
      } else if (employeeAttendanceData.length == 2) {
        if (employeeAttendanceData[0].status == "present") {
          this.presentCount = employeeAttendanceData[0].count;
          this.absentCount = employeeAttendanceData[1].count;
        }
        if (employeeAttendanceData[0].status == "absent") {
          this.absentCount = employeeAttendanceData[0].count;
          this.presentCount = employeeAttendanceData[1].count;
        }
      } else {
        this.absentCount = "N/A";
        this.presentCount = "N/A";
      }
    }
  }
}
