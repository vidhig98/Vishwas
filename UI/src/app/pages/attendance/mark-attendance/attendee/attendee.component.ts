import { Component, OnInit, Input } from "@angular/core";
import { AttendanceService } from "../../../../services/attendance.service";
import { Employee } from "src/app/pages/employees/employee/employee";

@Component({
  selector: "app-attendee",
  templateUrl: "./attendee.component.html",
  styleUrls: ["./attendee.component.scss"]
})
export class AttendeeComponent implements OnInit {
  @Input() employee: Employee;
  overtime: number;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {}

  onSelectAttendance(element) {
    element.checked = !element.checked;
    this.attendanceService.attendance.push({
      user_id: this.employee._id,
      attendance: element.value,
      overtime: this.overtime,
      organization: this.employee.organization
    });
  }

  onOvertime() {
    this.attendanceService.attendance[
      this.employee._id
    ].overtime = this.overtime;
  }
}
