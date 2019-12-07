import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  loggedInUser;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    this.loggedInUser = this.isAuthenticated()
      ? JSON.parse(cookieService.get("user"))
      : null;
  }

  login(username: string, password: string) {
    let body = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.http.post(environment.API_URL + "/auth/login", body);
  }

  logout() {
    this.cookieService.delete("token");
    this.cookieService.delete("user");
    this.router.navigate(["login"]);
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get("token");
    if (token) {
      if (!this.jwtHelper.isTokenExpired()) {
        return true;
      }
      this.cookieService.delete("token");
      this.cookieService.delete("user");
      return false;
    }
    return false;
  }
}
