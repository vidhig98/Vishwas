import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { EmployeesComponent } from "./pages/employees/employees.component";
import { AttendanceComponent } from "./pages/attendance/attendance.component";
import { TasksComponent } from "./pages/tasks/tasks.component";
import { CrmComponent } from "./pages/crm/crm.component";
import { RecruitmentComponent } from "./pages/recruitment/recruitment.component";
import { MarkAttendanceComponent } from "./pages/attendance/mark-attendance/mark-attendance.component";
import { CompanySheetComponent } from "./pages/attendance/company-sheet/company-sheet.component";
import { RoutineTasksComponent } from "./pages/tasks/routine-tasks/routine-tasks.component";
import { SpecialTasksComponent } from "./pages/tasks/special-tasks/special-tasks.component";
import { LeadsComponent } from "./pages/crm/leads/leads.component";
import { CustomersComponent } from "./pages/crm/customers/customers.component";
import { EmployeeDetailComponent } from "./pages/employees/employee/employee-detail/employee-detail.component";
import { AddEmployeeComponent } from "./pages/employees/add-employee/add-employee.component";
import { AddLeadComponent } from "./pages/crm/leads/add-lead/add-lead.component";
import { AddCustomerComponent } from "./pages/crm/customers/add-customer/add-customer.component";
import { AddPositionComponent } from "./pages/recruitment/add-position/add-position.component";
import { AddTaskComponent } from "./pages/tasks/add-task/add-task.component";
import { EmployeeAttendanceComponent } from "./pages/attendance/employee-attendance/employee-attendance.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { LeadDetailComponent } from "./pages/crm/leads/lead/lead-detail/lead-detail.component";
import { CustomerDetailComponent } from "./pages/crm/customers/customer/customer-detail/customer-detail.component";
import { PositionDetailComponent } from "./pages/recruitment/position/position-detail/position-detail.component";
import { MainComponent } from "./components/main/main.component";
import { ItemDetailComponent } from "./pages/inventory/item/item-detail/item-detail.component";
import { InventoryComponent } from "./pages/inventory/inventory.component";
import { AddItemComponent } from "./pages/inventory/add-item/add-item.component";
import { ItemComponent } from "./pages/inventory/item/item.component";
import { ProductDetailComponent } from "./pages/production/product/product-detail/product-detail.component";
import { ProductionComponent } from "./pages/production/production.component";
import { AddProductComponent } from "./pages/production/add-product/add-product.component";
import { ProductComponent } from "./pages/production/product/product.component";
const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "home",
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "employee",
        component: EmployeesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "employee/add",
        component: AddEmployeeComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "employee/:id",
        component: EmployeeDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "employee/:id/edit",
        component: AddEmployeeComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      },
      {
        path: "employee/:id/attendance",
        component: EmployeeAttendanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "attendance",
        component: AttendanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "attendance/mark",
        component: MarkAttendanceComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "attendance/sheet",
        component: CompanySheetComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "task",
        component: TasksComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "task/routine",
        component: RoutineTasksComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "task/routine/add",
        component: AddTaskComponent,
        data: { type: "routine" },
        canActivate: [AuthGuardService]
      },
      {
        path: "task/special",
        component: SpecialTasksComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "task/special/add",
        component: AddTaskComponent,
        data: { type: "special" },
        canActivate: [AuthGuardService]
      },
      { path: "crm", component: CrmComponent, canActivate: [AuthGuardService] },
      {
        path: "crm/lead",
        component: LeadsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/lead/add",
        component: AddLeadComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/lead/:id",
        component: LeadDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/lead/:id/edit",
        component: AddLeadComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/customer",
        component: CustomersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/customer/add",
        component: AddCustomerComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/customer/:id",
        component: CustomerDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "crm/customer/:id/edit",
        component: AddCustomerComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      },
      {
        path: "recruitment",
        component: RecruitmentComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "recruitment/add",
        component: AddPositionComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "recruitment/:id",
        component: PositionDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "recruitment/:id/edit",
        component: AddPositionComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      },
      {
        path: "inventory",
        component: InventoryComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "inventory/add",
        component: AddItemComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "inventory/:id",
        component: ItemDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "inventory/:id/edit",
        component: AddItemComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      },
      {
        path: "production",
        component: ProductionComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "production/add",
        component: AddProductComponent,
        data: { editMode: false },
        canActivate: [AuthGuardService]
      },
      {
        path: "production/:id",
        component: ProductDetailComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "production/:id/edit",
        component: AddProductComponent,
        data: { editMode: true },
        canActivate: [AuthGuardService]
      }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
