import { Component, OnInit } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import * as _ from "lodash";

@Component({
  selector: "app-routine-tasks",
  templateUrl: "./routine-tasks.component.html",
  styleUrls: ["./routine-tasks.component.scss"]
})
export class RoutineTasksComponent implements OnInit {
  tasks = [];
  today: Date | string = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks("routine").subscribe(
      (res: any) => {
        const parsedRes = res.map(task => {
          const parsedTask = { ...task._id };
          parsedTask["comments"] = task.comments;
          if (_.isEmpty(parsedTask.comments[0])) {
            parsedTask.comments.pop();
          }
          return parsedTask;
        });
        this.tasks = parsedRes;
      },
      err => {
        console.error(err);
      }
    );
  }
}
