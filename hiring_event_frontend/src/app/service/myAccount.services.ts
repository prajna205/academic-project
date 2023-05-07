import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class MyAccountService{
    private baseUrl = 'http://localhost:8085/';
    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }
    getUserProfileDetails(): Observable<any>{
      return this.http.get(`${this.baseUrl}user-profile-details`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})

    }
    getUserProfile(username :string): Observable<any>{
      return this.http.get(`${this.baseUrl}get-user-profile/${username}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})
        
    }
    createUserProfileDetails(value:any):Observable<any>{
      return this.http.post(`${this.baseUrl}user-profile-details`,value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})

    }

    updateUserProfileDetails(uuid:string , value :any): Observable<any>{
      return this.http.put(`${this.baseUrl}update-user-profile-details/${uuid}`,value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})

    }
}
