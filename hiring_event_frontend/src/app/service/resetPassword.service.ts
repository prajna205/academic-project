import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/Login";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService{
  private baseUrl= 'http://localhost:8085';
  constructor(private http : HttpClient){}

  resetPassword(resetPass: Login):Observable<Object>{
    console.log(resetPass);
    
    if(resetPass.resetPasswordToken == null){
      resetPass.resetPasswordToken = null;
    }
      return this.http.post(`${this.baseUrl}/open-login/reset-system-password`,resetPass ,
       {responseType:'text' });

}
}
