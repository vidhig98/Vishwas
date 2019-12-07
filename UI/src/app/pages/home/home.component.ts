import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  menuItems = [];

  employeeMenuItems = [
    {
      background: "../../assets/img/attendance.png",
      name: "Attendance",
      route: `../employee/${this.authService.getLoggedInUser()._id}/attendance`
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Task",
      route: "../task"
    }
  ];

  adminMenuItems = [
    {
      background: "../../assets/img/employee-list.png",
      name: "Employee List",
      route: "../employee"
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Inventory",
      route: "../inventory"
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Production",
      route: "../production"
    },
    {
      background: "../../assets/img/attendance.png",
      name: "Attendance Sheet",
      route: "../attendance"
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Task Manager",
      route: "../task"
    },
    {
      background: "../../assets/img/crm.png",
      name: "CRM",
      route: "../crm"
    },
    {
      background: "../../assets/img/recruitment.png",
      name: "Recruitment",
      route: "../recruitment"
    }
  ];

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.menuItems =
      this.authService.getLoggedInUser().role == "admin"
        ? this.adminMenuItems
        : this.employeeMenuItems;
  }
}
