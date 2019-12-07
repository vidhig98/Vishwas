import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.scss"]
})
export class TaskComponent implements OnInit {
  done: boolean = false;
  visible: boolean = true;
  @Input() task: any;
  comments: any[] = [];
  owner: boolean;
  showComments: boolean = false;
  commentText: string = "";
  msg: string;
  editable: boolean = false;
  @ViewChild("taskText", { static: false }) taskText: ElementRef;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.comments = this.task.comments;
    this.owner =
      this.authService.getLoggedInUser()._id == this.task.assigned_by
        ? true
        : false;
    if (this.authService.getLoggedInUser().role == "admin") {
      this.owner = true;
    }
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  toggleEditableMode() {
    if (this.editable) {
      this.editTask();
      this.editable = !this.editable;
    } else {
      this.editable = !this.editable;
    }
  }

  editTask() {
    if (this.taskText.nativeElement.innerText != "") {
      if (this.task.name != this.taskText.nativeElement.innerText) {
        this.taskService
          .editTask(this.task._id, this.taskText.nativeElement.innerText)
          .subscribe(
            (res: any) => {
              console.log(res);
            },
            err => {
              console.error(err);
            }
          );
      }
    }
  }

  deleteTask() {
    this.taskService.removeTask(this.task._id).subscribe(
      (res: any) => {
        this.visible = false;
      },
      err => {
        console.error(err);
      }
    );
  }

  postComment() {
    if (this.commentText.trim() != "") {
      this.taskService.addComment(this.task._id, this.commentText).subscribe(
        (res: any) => {
          console.log(res);
          this.comments.push(res);
          this.commentText = "";
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  onTaskDone() {
    // this.done = event.target.checked;
  }
}
