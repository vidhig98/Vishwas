import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TaskService } from "src/app/services/task.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-task-comment",
  templateUrl: "./task-comment.component.html",
  styleUrls: ["./task-comment.component.scss"]
})
export class TaskCommentComponent implements OnInit {
  @Input() comment: any;
  visible: boolean = true;
  editable: boolean = false;
  owner: boolean;
  @ViewChild("commentText", { static: false })
  commentText: ElementRef;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.owner =
      this.authService.getLoggedInUser()._id == this.comment.posted_by._id
        ? true
        : false;
  }

  deleteComment() {
    this.taskService
      .removeComment(this.comment.posted_to, this.comment._id)
      .subscribe(
        (res: any) => {
          this.visible = false;
        },
        err => {
          console.error(err);
        }
      );
  }

  editComment() {
    if (this.commentText.nativeElement.innerText != "") {
      if (this.comment.text != this.commentText.nativeElement.innerText) {
        this.taskService
          .editComment(
            this.comment.posted_to,
            this.comment._id,
            this.commentText.nativeElement.innerText
          )
          .subscribe(
            (res: any) => {
              console.log(res);
              const postedByFirstName = this.comment.posted_by.firstName;
              const postedByLastName = this.comment.posted_by.lastName;
              this.comment = res;
              this.comment.posted_by = {
                firstName: postedByFirstName,
                lastName: postedByLastName
              };
            },
            err => {
              console.error(err);
            }
          );
      }
    }
  }

  toggleEditableMode() {
    if (this.editable) {
      this.editComment();
      this.editable = !this.editable;
    } else {
      this.editable = !this.editable;
    }
  }
}
