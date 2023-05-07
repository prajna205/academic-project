import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/Login';
import { AuthGuard } from '../guard/auth.guard';
import { ResetPasswordService } from '../service/resetPassword.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  hide1: boolean = false;
  hide2: boolean = true;
  loginModel: Login = new Login();
  confirmPassword : string = "";
  showPassword = false;
  showType = false;
  // userName : string ="" ;
  constructor(
    private resetPasswordService: ResetPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthGuard,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginModel = new Login();
    this.loginModel.username = this.route.snapshot.params['userName'];
    this.loginModel.resetPasswordToken = sessionStorage.getItem('token');
    // this.loginModel.resetPasswordToken =this.authService.getToken();
  }

  hideDiv() {
    this.hide1 = true;
    this.hide2 = false;
  }

  resetPassword() {
    {
      this.resetPasswordService.resetPassword(this.loginModel).subscribe(
        (data: any) => {
          console.log(data);

          sessionStorage.removeItem('token');
          this.toastr.success('Password Changed Successfully!', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Password Cannot be changed, Try Again !  ', 'Ooppss...');
          console.error(error.error.message + ' ' + error.error.details);
        }
      );
    }
  }
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.showType = !this.showType ? true : false;
  }

}
