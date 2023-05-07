import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";


@Injectable({
    providedIn: 'root'
})
export class SkillSetService{

    private baseUrl = 'http://localhost:8080/skills/';
    private token = '';

    constructor(private http: HttpClient, private authService : AuthGuard) {
      this.token = authService.getToken();
     }



    getSkillSetList(): any {
      console.log(this.token);
      return this.http.get(`${this.baseUrl}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
    getSingleSkillSet(id: number): any {
      return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

    getSkillSet(id: number): any {
      return this.http.get(`${this.baseUrl}${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

    createSkillSet(skillset: Object): Observable<Object> {
      return this.http.post(`${this.baseUrl}`, skillset, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

    updateSkillSet(id: number, value: any): Observable<Object> {
      return this.http.put(`${this.baseUrl}${id}`, value, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }

    deleteSkillSet(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}${id}`, { responseType: 'text' , headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
}
