import { Injectable } from "@angular/core";
import { Employee } from "../pages/employees/employee/employee";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get(`${environment.API_URL}/employees`).pipe(
      map((emp: any) => {
        const employees = emp.data;
        return employees.map(e => {
          return new Employee(e);
        });
      })
    );
  }

  getEmployee(employeeID: string) {
    return this.http.get(`${environment.API_URL}/employees/${employeeID}`).pipe(
      map((emp: any) => {
        return emp.data;
      })
    );
  }

  searchEmployee(searchQuery: string) {
    return this.http.get(
      `${environment.API_URL}/employees/search?q=${searchQuery}`
    );
  }

  addEmployee(employee: Employee) {
    return this.http.post(`${environment.API_URL}/employees`, employee);
  }

  updateEmployee(employeeID: string, employee: Employee) {
    return this.http.put(
      `${environment.API_URL}/employees/${employeeID}`,
      employee
    );
  }
}
