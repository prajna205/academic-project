import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class UserInfoService{
    private baseUrl = 'http://localhost:8080/user-info/';

    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }

    createUserInfo(userinfo: Object): any {

        return this.http.post(`${this.baseUrl}`, userinfo, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
    getUserInfoList(): any {
        return this.http.get(`${this.baseUrl}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
    getUserInfo(id: number): any {
        return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      updateUserInfo(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}${id}`, value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      deleteUserInfo(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' , headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }
}
