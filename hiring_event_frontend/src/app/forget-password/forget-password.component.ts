import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorModel } from '../Models/errorModel.model';
import { OtpUser } from '../Models/otpUser.model';
import { OtpUserService } from '../service/forgetPassword.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent implements OnInit {
  sendOtp = false;
  username: string;
  otpUser: OtpUser = new OtpUser();
  items = [1, 2, 3, 4];
  finalOtp: string;
  errorModel: ErrorModel;
  attempts: string;
  isMaxAttemptReached: boolean = false;

  constructor(
    private router: Router,
    private otpUserService: OtpUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  sendOTP() {
    this.otpUserService.getUserNameAndSendOtp(this.username).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.sendOtp = true;
  }

  onOtpChange(otp) {
    this.finalOtp = otp;
  }

  validate() {
    // var finalOtp = parseFloat(this.otpArr.toString().replace(/,/g, ""));
    this.otpUser.otp = this.finalOtp;
    this.otpUser.user = this.username;
    this.otpUserService.validateOtp(this.otpUser).subscribe(
      (data) => {
        console.log('is otp valid/correct - ' + data);
        this.toastr.success('Please Enter New Password', 'Correct OTP');
        this.router.navigate(['/reset-password', this.username]);
      },
      (error) => {
        this.errorModel = error.error;
        this.toastr.error(`${this.errorModel.userInterfaceMessage}`, 'Error');
      }
    );
  }
  attemptCounter = 1;
  timerCounter: number;
  resend(timer) {
    this.timerCounter = timer;
    this.attemptCounter++;
    this.otpUserService.getUserNameAndSendOtp(this.username).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.sendOtp = true;

    // this.timer();

    this.timer(timer);

    this.toastr.success('OTP Resent Successfully..', 'Check SMS/EMAIL');
    
    if (this.attemptCounter == 4) {
      this.isMaxAttemptReached = true;
    }
  }

  timerOn = true;
  timer(remaining) {
    var m: any = Math.floor(remaining / 60);
    var s: any = remaining % 60;

    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    document.getElementById('timer').innerHTML = m + ':' + s;
    remaining -= 1;

    if (remaining >= 0) {
      setTimeout(() => {
        this.timer(remaining);
      }, 1000);
      this.timerOn = false;
      return;
    }

    this.timerOn = true;
    if (this.timerOn) {
      return;
    }
  }
}
