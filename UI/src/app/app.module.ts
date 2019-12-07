import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { ValdemortModule } from "ngx-valdemort";
import { CookieService } from "ngx-cookie-service";
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { HeaderComponent } from "./includes/header/header.component";
import { MenuItemComponent } from "./components/menu-item/menu-item.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { CrmComponent } from "./pages/crm/crm.component";
import { EmployeesComponent } from "./pages/employees/employees.component";
import { EmployeeComponent } from "./pages/employees/employee/employee.component";
import { EmployeeDetailComponent } from "./pages/employees/employee/employee-detail/employee-detail.component";
import { AddEmployeeComponent } from "./pages/employees/add-employee/add-employee.component";
import { AddBtnComponent } from "./components/add-btn/add-btn.component";
import { LeadsComponent } from "./pages/crm/leads/leads.component";
import { LeadComponent } from "./pages/crm/leads/lead/lead.component";
import { AddLeadComponent } from "./pages/crm/leads/add-lead/add-lead.component";
import { CustomersComponent } from "./pages/crm/customers/customers.component";
import { CustomerComponent } from "./pages/crm/customers/customer/customer.component";
import { AddCustomerComponent } from "./pages/crm/customers/add-customer/add-customer.component";
import { RecruitmentComponent } from "./pages/recruitment/recruitment.component";
import { AddPositionComponent } from "./pages/recruitment/add-position/add-position.component";
import { PositionComponent } from "./pages/recruitment/position/position.component";
import { MarkAttendanceComponent } from "./pages/attendance/mark-attendance/mark-attendance.component";
import { CompanySheetComponent } from "./pages/attendance/company-sheet/company-sheet.component";
import { EmployeeAttendanceComponent } from "./pages/attendance/employee-attendance/employee-attendance.component";
import { AttendeeComponent } from "./pages/attendance/mark-attendance/attendee/attendee.component";
import { DepartmentComponent } from "./pages/attendance/department/department.component";
import { AttendeeStatsComponent } from "./pages/attendance/company-sheet/attendee-stats/attendee-stats.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { TasksComponent } from "./pages/tasks/tasks.component";
import { BadgedMenuItemComponent } from "./components/badged-menu-item/badged-menu-item.component";
import { RoutineTasksComponent } from "./pages/tasks/routine-tasks/routine-tasks.component";
import { TaskComponent } from "./pages/tasks/task/task.component";
import { SpecialTasksComponent } from "./pages/tasks/special-tasks/special-tasks.component";
import { AddTaskComponent } from "./pages/tasks/add-task/add-task.component";
import { TaskCommentComponent } from "./pages/tasks/task/task-comment/task-comment.component";
import { LeadDetailComponent } from "./pages/crm/leads/lead/lead-detail/lead-detail.component";
import { CustomerDetailComponent } from "./pages/crm/customers/customer/customer-detail/customer-detail.component";
import { LeadCommentComponent } from "./pages/crm/leads/lead/lead-detail/lead-comment/lead-comment.component";
import { CustomerCommentComponent } from "./pages/crm/customers/customer/customer-detail/customer-comment/customer-comment.component";
import { PositionDetailComponent } from "./pages/recruitment/position/position-detail/position-detail.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AuthService } from "./services/auth.service";
import { MainComponent } from "./components/main/main.component";
import { ItemDetailComponent } from "./pages/inventory/item/item-detail/item-detail.component";
import { InventoryComponent } from "./pages/inventory/inventory.component";
import { AddItemComponent } from "./pages/inventory/add-item/add-item.component";
import { ItemComponent } from "./pages/inventory/item/item.component";
import { ProductDetailComponent } from "./pages/production/product/product-detail/product-detail.component";
import { ProductionComponent } from "./pages/production/production.component";
import { AddProductComponent } from "./pages/production/add-product/add-product.component";
import { ProductComponent } from "./pages/production/product/product.component";

export function jwtOptionsFactory(cookieService) {
  return {
    tokenGetter: () => {
      return cookieService.get("token");
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuItemComponent,
    AttendanceComponent,
    CrmComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeDetailComponent,
    AddEmployeeComponent,
    AddBtnComponent,
    LeadsComponent,
    LeadComponent,
    AddLeadComponent,
    CustomersComponent,
    CustomerComponent,
    AddCustomerComponent,
    RecruitmentComponent,
    AddPositionComponent,
    PositionComponent,
    MarkAttendanceComponent,
    CompanySheetComponent,
    EmployeeAttendanceComponent,
    AttendeeComponent,
    DepartmentComponent,
    AttendeeStatsComponent,
    CalendarComponent,
    TasksComponent,
    BadgedMenuItemComponent,
    RoutineTasksComponent,
    TaskComponent,
    SpecialTasksComponent,
    AddTaskComponent,
    TaskCommentComponent,
    LeadDetailComponent,
    CustomerDetailComponent,
    LeadCommentComponent,
    CustomerCommentComponent,
    PositionDetailComponent,
    MainComponent,
    ItemDetailComponent,
    InventoryComponent,
    AddItemComponent,
    ItemComponent,
    ProductDetailComponent,
    ProductionComponent,
    AddProductComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ValdemortModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "XSRF-TOKEN",
      headerName: "X-XSRF-TOKEN"
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [CookieService]
      }
    })
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
