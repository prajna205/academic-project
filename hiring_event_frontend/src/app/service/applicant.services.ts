import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";


@Injectable(
    {providedIn : 'root'}
)
export class ApplicantService {
    private baseUrl = 'http://localhost:8080/';
    token;
    httpOptions;
    applicantStatus :string;
    

    constructor(private http: HttpClient, private authService : AuthGuard) {
        this.token = authService.getToken();
        this.httpOptions = {
            headers: new HttpHeaders({"Authorization": "Bearer "+this.token}),
            responseType : 'blob' as 'json'
          };
    }

    createApplicant(applicant: Object): Observable<Object> {
        return this.http.post(`${this.baseUrl}application-developer-jobs/`, applicant);
    }

    countApplicantForJob(id : number) : Observable<Object> {
        console.log("countApplicantForJob()"+id);

        return this.http.get(`${this.baseUrl}count-applicant/${id}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)});
    }
    viewApplicants(jobId : number) : Observable<any> {
      console.log("jobid  ...", jobId);

      return this.http.get(`${this.baseUrl}get-applicant/${jobId}`, {headers: new HttpHeaders().set("Authorization", "Bearer "+this.token)})
    }

    downloadResume(panCard : string){
        console.log(`${this.baseUrl}resume/downloadResume/${panCard}`);
        window.open(`${this.baseUrl}resume/downloadResume/${panCard}`);
        return this.http.get(`${this.baseUrl}resume/downloadResume/${panCard}`, this.httpOptions);
    }
}
