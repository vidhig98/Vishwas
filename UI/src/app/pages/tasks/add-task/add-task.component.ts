import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "src/app/services/task.service";
import { EmployeesService } from "src/app/services/employees.service";

@Component({
  selector: "app-add-task",
  templateUrl: "./add-task.component.html",
  styleUrls: ["./add-task.component.scss"]
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskType: string;
  showDueBy: boolean = false;
  showWeekdays: boolean = false;
  showEmployeeSearchBox: boolean = false;
  showEmployeeSearchBoxResults: boolean = false;
  employeeSearchBoxResults = [];
  selectedEmployees = [];
  msg: string;

  @ViewChild("employee_search_box", { static: false })
  employeeSearchBox: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private employeeService: EmployeesService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.taskType = data.type;
    });
    if (this.taskType == "special") {
      this.showDueBy = true;
    }
    if (this.taskType == "routine") {
      this.taskForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        type: new FormControl(this.taskType, Validators.required),
        frequency: new FormControl("daily", Validators.required),
        weekday: new FormControl(null),
        due_by: new FormControl(null),
        assigned_to_type: new FormControl("all", Validators.required),
        assigned_to: new FormControl(null)
      });
    }
    if (this.taskType == "special") {
      this.taskForm = new FormGroup({
        name: new FormControl(null, Validators.required),
        type: new FormControl(this.taskType, Validators.required),
        due_date: new FormControl(null, Validators.required),
        assigned_to_type: new FormControl("all", Validators.required),
        assigned_to: new FormControl(null)
      });
    }
    this.showEmployeeSearchBox =
      this.taskForm.value.assigned_to_type == "some" ? true : false;
  }

  onTaskTypeChange(freq: HTMLSelectElement) {
    if (this.taskType == "routine") {
      if (freq.value == "monthly") {
        this.showDueBy = true;
        this.showWeekdays = false;
      } else if (freq.value == "weekly") {
        this.showWeekdays = true;
        this.showDueBy = false;
      } else {
        this.showDueBy = false;
        this.showWeekdays = false;
      }
    }
  }

  onAssignedToChange(assigned_to: HTMLSelectElement) {
    if (assigned_to.value == "some") {
      this.showEmployeeSearchBox = true;
    } else {
      this.showEmployeeSearchBox = false;
    }
  }

  onEmployeeSearchBoxChange() {
    if (this.employeeSearchBox.nativeElement.value == "") {
      this.showEmployeeSearchBoxResults = false;
    } else {
      this.showEmployeeSearchBoxResults = true;
      this.employeeService
        .searchEmployee(this.employeeSearchBox.nativeElement.value)
        .subscribe(
          (res: any) => {
            this.employeeSearchBoxResults = res;
          },
          err => {
            console.error(err);
          }
        );
    }
  }

  onEmployeeSearchBoxResultClick(employee: any) {
    this.showEmployeeSearchBoxResults = false;
    this.employeeSearchBox.nativeElement.value = "";
    this.selectedEmployees.push(employee);
  }

  onSubmit() {
    // console.log(this.taskForm);
    if (this.taskForm.value.assigned_to_type == "some") {
      this.taskForm.value.assigned_to = this.selectedEmployees;
    }
    // console.log(this.taskForm);
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value).subscribe(
        (res: any) => {
          // console.log(res.message);
          this.msg = res.message;
          this.taskForm.reset();
          this.selectedEmployees = [];
        },
        err => {
          // console.error(err.error.message);
          this.msg = err.error.message;
        }
      );
    }
  }
}
