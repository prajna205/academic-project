import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";


@Injectable(
    {providedIn : 'root'}
)
export class MostAppliedJob {
    private baseUrl = 'http://localhost:8080/';
    token;
    

    constructor(private http: HttpClient, private authService : AuthGuard) {
        this.token = authService.getToken();
    }

    getMostAppliedJob(): Observable<Object> {
        return this.http.get(`${this.baseUrl}get-top-five`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

}
