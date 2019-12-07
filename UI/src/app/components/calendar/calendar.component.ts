import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";
import { AttendanceService } from "src/app/services/attendance.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
  attendance: string;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit, OnChanges {
  // days: string[] = ["M", "T", "W", "T", "F", "S", "S"];
  // daysShort: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // daysFull: string[] = [
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday"
  // ];
  currentDate = moment();
  dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  userID: string;
  userAttendance: any[] = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(
    private attendanceService: AttendanceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userID = params.get("id");
    });
    this.attendanceService
      .getUserAttendance(
        this.userID,
        this.currentDate.month(),
        this.currentDate.year()
      )
      .subscribe(
        (res: any) => {
          this.userAttendance = res;
          this.generateCalendar();
        },
        err => {
          console.error(err);
        }
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1
    ) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(
        changes.selectedDates.currentValue,
        (m: CalendarDate) => m.mDate.valueOf()
      );
      this.generateCalendar();
    }
  }

  // date checkers

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  isSelected(date: moment.Moment): boolean {
    return (
      _.findIndex(this.selectedDates, selectedDate => {
        return moment(date).isSame(selectedDate.mDate, "day");
      }) > -1
    );
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, "month");
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar

  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.attendanceService
      .getUserAttendance(
        this.userID,
        this.currentDate.month(),
        this.currentDate.year()
      )
      .subscribe(
        (res: any) => {
          this.userAttendance = res;
          this.generateCalendar();
        },
        err => {
          console.error(err);
        }
      );
  }

  nextMonth(): void {
    const nextMonth = moment(this.currentDate).add(1, "months");
    if (!(nextMonth.month() > moment().month())) {
      this.currentDate = nextMonth;
      this.attendanceService
        .getUserAttendance(
          this.userID,
          this.currentDate.month(),
          this.currentDate.year()
        )
        .subscribe(
          (res: any) => {
            this.userAttendance = res;
            this.generateCalendar();
          },
          err => {
            console.error(err);
          }
        );
    }
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf("year");
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf("year");
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "year");
    this.generateCalendar();
  }

  nextYear(): void {
    const nextYear = moment(this.currentDate).add(1, "year");
    if (!(nextYear.year() > moment().year())) {
      this.currentDate = nextYear;
    }
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment)
      .startOf("month")
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42).map(
      (date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        const userAttendanceIndex = this.userAttendance.findIndex(att => {
          return d.isSame(moment(att.date), "day");
        });
        if (userAttendanceIndex != -1) {
          return {
            today: this.isToday(d),
            selected: this.isSelected(d),
            mDate: d,
            attendance: this.userAttendance[userAttendanceIndex].attendance
          };
        }
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
          attendance: "N/A"
        };
      }
    );
  }
}
