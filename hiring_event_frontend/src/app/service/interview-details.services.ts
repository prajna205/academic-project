import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class InterViewDetailsService{
    private baseUrl = 'http://localhost:8080/interview-status/';
    token

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }

    getInterviewDetailsList(): any {
        return this.http.get(`${this.baseUrl}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }


      getInterviewDetails(id: number): any {
        return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      createInterviewDetails(interviewDetails: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, interviewDetails, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }
      updateInterviewDetails(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}${id}`, value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }

      deleteInterviewDetails(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text', headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
      }
}
