import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
  providedIn: 'root'
})
export class CreateUserService{
  private baseUrl= 'http://localhost:8085';
  constructor(private http : HttpClient , private authService : AuthGuard,private router : Router){}
  token = this.authService.getToken();
  createUser(user: Object):Observable<Object>{
    console.log("inside create user ",this.token);
      return this.http.post(`${this.baseUrl}/register-user`,user , {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});

}
addUser(){
  this.router.navigate(["/create-user"])
}
}
