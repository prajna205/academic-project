import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Params } from "@angular/router";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class JobDetailsService{
    private baseUrl = 'http://localhost:8080/job-details/';

    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }

      getJobDetailsList(): Observable<any> {
        
        return this.http.get(`${this.baseUrl}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }
      getSingleJobDetails(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      getJobDetails(id: number): Observable<any> {
        console.log(id);
        return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});

      }

      createJobDetails(jobdetails: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, jobdetails, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      updateJobDetails(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}${id}`, value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      deleteJobDetails(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text', headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

}
