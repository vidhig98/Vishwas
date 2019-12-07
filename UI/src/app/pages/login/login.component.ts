import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormControlName,
  Validators
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  msg: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([""]);
    }
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          (res: any) => {
            // console.log(res);
            const cookieDomain: string = environment.production
              ? "suparbiz.com"
              : "localhost";
            const cookieSecureFlag: boolean = environment.production
              ? true
              : false;
            if (res.token) {
              let expireTime = new Date();
              expireTime.setDate(expireTime.getDate() + 1);
              this.cookieService.set(
                "token",
                res.token,
                expireTime,
                "/",
                cookieDomain,
                cookieSecureFlag
              );
              this.cookieService.set(
                "user",
                JSON.stringify(res.user),
                expireTime,
                "/",
                cookieDomain,
                cookieSecureFlag
              );
              this.authService.loggedInUser = res.user;
              this.router.navigate(["/home"]);
            }
          },
          err => {
            this.msg = err.error.message;
          }
        );
    }
  }
}
