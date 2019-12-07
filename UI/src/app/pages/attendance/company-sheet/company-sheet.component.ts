import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { AttendanceService } from "src/app/services/attendance.service";
import { DepartmentService } from "src/app/services/department.service";

@Component({
  selector: "app-company-sheet",
  templateUrl: "./company-sheet.component.html",
  styleUrls: ["./company-sheet.component.scss"],
  providers: [DepartmentService]
})
export class CompanySheetComponent implements OnInit {
  departments: string[] = [];
  today: Date | String = new Date();

  constructor(
    private departmentService: DepartmentService,
    private attendanceService: AttendanceService
  ) {
    this.attendanceService.getAttendance().subscribe((res: any) => {
      // console.log(res);
      this.departmentService.departmentEmployeesAttendance = res;
    });
  }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(
      (res: any) => {
        res.forEach(department => {
          this.departments.push(department["_id"]);
        });
      },
      err => {
        console.error(err);
      }
    );
  }
}
