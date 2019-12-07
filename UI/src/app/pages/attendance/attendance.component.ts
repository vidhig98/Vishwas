import { Component, OnInit } from "@angular/core";
import { AttendanceService } from "../../services/attendance.service";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
  providers: [AttendanceService]
})
export class AttendanceComponent implements OnInit {
  menuItems = [
    {
      background: "../../assets/img/attendance.png",
      name: "Today's Attendance",
      route: "mark"
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Company Sheet",
      route: "sheet"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
