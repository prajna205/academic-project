import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class JobdetailsSkillSetmappingService{
    private baseUrl = 'http://localhost:8080/job-details-skill-set-mapping/';

    token;

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }


    createJobDetailsSkillSetMapping(jobdetailsSkillSetmapping: Object): Observable<Object> {

        return this.http.post(`${this.baseUrl}`, jobdetailsSkillSetmapping, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
    getSkillSetIds(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}jobs/${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
}
