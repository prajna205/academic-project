import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class InterviewRoundService{
    private baseUrl = 'http://localhost:8080/interview-round/';

    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }

      getInterviewRoundList(): Observable<any> {
        return this.http.get(`${this.baseUrl}` , {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})
     }

      getInterviewRound(id: number): Observable<any> {
        console.log(id);
        return this.http.get(`${this.baseUrl}${id}` , {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})

      }

      createInterviewRound(jobdetails: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}`, jobdetails , {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})
      }

      updateInterviewRound(id: number, value: any): Observable<Object> {
        return this.http.put(`${this.baseUrl}${id}`, value , {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})
      }

      deleteInterviewRound(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' , headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)} );
      }

}
