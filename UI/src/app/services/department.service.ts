import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {} from "../../environments/environment";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Employee } from "../pages/employees/employee/employee";

@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  departmentEmployeesAttendance: any[] = [];

  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get(`${environment.API_URL}/departments`);
  }

  getDepartmentEmployees(department: string) {
    return this.http
      .get(`${environment.API_URL}/departments/${department}/employees`)
      .pipe(
        map((departmentEmployees: Employee[]) => {
          // console.log(departmentEmployees);
          const employees = departmentEmployees;
          return employees.map(e => {
            return new Employee(e);
          });
        })
      );
  }
}
