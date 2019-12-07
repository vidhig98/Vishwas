import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../../services/task.service";
import * as _ from "lodash";

@Component({
  selector: "app-special-tasks",
  templateUrl: "./special-tasks.component.html",
  styleUrls: ["./special-tasks.component.scss"]
})
export class SpecialTasksComponent implements OnInit {
  tasks: any[] = [];
  today: Date | string = new Date();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks("special").subscribe(
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
