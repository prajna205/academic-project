import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { AuthGuard } from '../guard/auth.guard';
import { ErrorModel } from '../Models/errorModel.model';
import LoginService from '../service/login.service';
import { RoleService } from '../service/roles.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginModel: Login = new Login();
  errorModel: ErrorModel;
  isFetching: boolean = false;
  error :boolean;
  getVal = false;
  showPassword = false;
  showType = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authGuard: AuthGuard,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  login(userName: String) {
    this.getVal = true;
    this.isFetching = true;
    this.loginService.login(this.loginModel).subscribe(
      (data: any) => {
        console.log(data);
        if (!data.startsWith('Bearer ')) {
          let token = '';
          token = data;
          sessionStorage.setItem('token', token);
          this.router.navigate(['/reset-password', userName]);
        }
        if (data.startsWith('Bearer ')) {
          let bearerToken = '';
          bearerToken = data.replace('Bearer ', '');
          console.log(bearerToken);

          sessionStorage.setItem('token', bearerToken);
          this.router.navigate(['/home']);
          let token = sessionStorage.getItem('token');
          console.log(token, 'inside login method the bearer token');
        }
        this.isFetching = false;
        this.getVal = false;
        this.error = false;
        this.toastr.success('Login Successful!', 'Success');
      },
      (error) => {
        console.log(error.error);
        
        this.getVal = false;
        // this.errorModel = error.error;
        let str = error.error;
        this.errorModel = JSON.parse(str);
        console.log(this.errorModel.userInterfaceMessage);
        
        this.error = true;
        this.toastr.error(`${this.errorModel.userInterfaceMessage}`, "Error");
      }
    );
  }

  loginSubmit(event){
    console.log(event);
    console.log(this.loginModel);
    this.login(this.loginModel.username);
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    this.showType = !this.showType ? true : false;
  }
  goToForgetPassword(){
    this.router.navigate(['/forget-password'])
  }
}
