import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class ResumeStorageService{
    private baseUrl = 'http://localhost:8080/resume/upload-file';
    private baseApiUrl = 'https://file.io';


    constructor(private http: HttpClient) {}

    createResumePath(file: File): Observable<Object> {
        const formData = new FormData(); 
        
      // Store form name as "file" with file data
      formData.append("file", file, file.name);
      this.http.post(this.baseApiUrl, formData)
        return this.http.post(`${this.baseUrl}`, formData);
    }
}  