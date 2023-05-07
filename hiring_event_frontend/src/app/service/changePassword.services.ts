import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";
import { ChangeUserPassword } from "../Models/changePassword.model";

@Injectable(
    {providedIn : 'root'}
)

export class ChangePasswordService {
    private baseUrl = 'http://localhost:8085';
    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
        this.token = authService.getToken();
    }

    changeUserPassword(user : string, value : ChangeUserPassword) : Observable<Object> {
        return this.http.post(`${this.baseUrl}/change-password/${user}`, value,  {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
}