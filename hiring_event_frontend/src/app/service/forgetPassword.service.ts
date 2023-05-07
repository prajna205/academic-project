import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";
import { OtpUser } from "../Models/otpUser.model";

@Injectable({
    providedIn: 'root'
})
export class OtpUserService{
    
    private baseUrl= 'http://localhost:8085';

    constructor(private http : HttpClient){}


    getUserNameAndSendOtp(username : string){
        return this.http.post(`${this.baseUrl}/open-login/forget-password`, username);
    }

    validateOtp(otpUser : OtpUser) {
        return this.http.post(`${this.baseUrl}/open-login/validate-otp`, otpUser);
    }
}