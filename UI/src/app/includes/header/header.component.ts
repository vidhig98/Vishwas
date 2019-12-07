import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  showAccountMenu: boolean = false;
  currentUserId: string;
  currentUserRole: string;
  currentUserFirstName: string;
  currentUserLastName: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUserId = this.authService.getLoggedInUser()._id;
    this.currentUserRole = this.authService.getLoggedInUser().role;
    this.currentUserFirstName = this.authService.getLoggedInUser().first_name;
    this.currentUserLastName = this.authService.getLoggedInUser().last_name;
  }

  toggleAccountMenu() {
    this.showAccountMenu = !this.showAccountMenu;
  }

  logout() {
    this.authService.logout();
  }
}
