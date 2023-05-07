import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private baseUrl = 'http://localhost:8085';
  constructor(private router: Router,private http: HttpClient) {

   }
  token = '';
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      
    this.token = sessionStorage.getItem('token');
    console.log(this.token, "token");

    this.getUserDetails().subscribe((data) => {
      console.log("data ", data);
      // data.roles = "User";
      console.log("data.roles ", data.roles);
      sessionStorage.setItem('role', data.roles);

    },
      (error) => console.log(error));

      
    if (this.token != "undefined" && this.token != null) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(this.token)) {
    sessionStorage.removeItem('token');

        this.router.navigate(['/login']);
        console.warn("Session expired! Please login again");
        return false;
      }

      return true;
    } else {

      this.router.navigate(['/login']);
      console.log('Please login to continue...');
      return false;

    }
  }

  getToken() {
    return this.token;
  }
  getUserDetails(): any {
    console.log("inside auth guard getUserDetails() ",this.token);
      return this.http.get(`${this.baseUrl}/user/me`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

}
