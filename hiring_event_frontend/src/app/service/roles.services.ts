import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
  providedIn: 'root'
})
export class RoleService{
  private baseUrl = 'http://localhost:8085';
  token

  constructor(private http: HttpClient, private authService : AuthGuard) {
    // this.token = authService.getToken();
    this.token = sessionStorage.getItem('token')

   }

  getUserDetails(): any {
    console.log("inside roles service ",this.token);
      return this.http.get(`${this.baseUrl}/user/me`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
  }
