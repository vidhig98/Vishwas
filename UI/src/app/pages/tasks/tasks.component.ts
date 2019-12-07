import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
  providers: [TaskService]
})
export class TasksComponent implements OnInit {
  menuItems = [
    {
      background: "../../assets/img/attendance.png",
      name: "Routine Tasks",
      route: "routine",
      badge: null
    },
    {
      background: "../../assets/img/tasks.jpg",
      name: "Special Tasks",
      route: "special",
      badge: null
    }
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTaskCount().subscribe(
      (res: any) => {
        // console.log(res);
        if (res.length != 0) {
          if (res.length == 1) {
            if (res[0]._id == "routine") {
              this.menuItems[0].badge = res[0].count;
              this.menuItems[1].badge = 0;
            } else {
              this.menuItems[1].badge = res[0].count;
              this.menuItems[0].badge = 0;
            }
          } else if (res.length == 2) {
            if (res[0]._id == "routine") {
              this.menuItems[0].badge = res[0].count;
              this.menuItems[1].badge = res[1].count;
            } else {
              this.menuItems[1].badge = res[0].count;
              this.menuItems[0].badge = res[1].count;
            }
          }
        } else {
          this.menuItems[0].badge = 0;
          this.menuItems[1].badge = 0;
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
