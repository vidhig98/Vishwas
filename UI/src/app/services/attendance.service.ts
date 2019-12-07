import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AttendanceService {
  attendance = [];

  constructor(private http: HttpClient) {}

  markAttendance() {
    return this.http.post(environment.API_URL + "/users/attendance", {
      users: this.attendance
    });
  }

  getAttendance() {
    return this.http.get(environment.API_URL + "/users/attendance");
  }

  getUserAttendance(userID: string, month: number, year: number) {
    return this.http.post(
      environment.API_URL + `/users/${userID}/attendance`,
      new HttpParams().append("month", `${month}`).append("year", `${year}`)
    );
  }
}
