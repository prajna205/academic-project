import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../guard/auth.guard';
import { ChangeUserPassword } from '../Models/changePassword.model';
import { ErrorModel } from '../Models/errorModel.model';
import { MyAccount } from '../Models/myAccount.model';
import { UserProfile } from '../Models/userProfile.model';
import { ChangePasswordService } from '../service/changePassword.services';
import { MyAccountService } from '../service/myAccount.services';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  myAccount: MyAccount;
  userProfileDetails: UserProfile = new UserProfile();
  editProfile: boolean = false;
  urlLink: string;
  // id:string = null;
  constructor(
    private authGuard: AuthGuard,
    private myAccountService: MyAccountService,
    private changePasswordService: ChangePasswordService,
    private toastr: ToastrService,
    private authService: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myAccount = new MyAccount();
    this.authGuard.getUserDetails().subscribe(
      (data) => {
        console.log('data in  my account ', data);
        this.myAccount = data;
        let id = this.myAccount.username;
        console.log('myAccount: ', this.myAccount);

        this.userProfile(id);
      },
      (error) => console.log(error)
    );
  }
  onEditProfileClick() {
    this.editProfile = !this.editProfile;
  }
  async userProfile(id) {
    // const sleep = ms => new Promise(
    //   resolve => setTimeout(resolve, ms));
    //   await sleep(3000);
    this.myAccountService.getUserProfile(id).subscribe((data) => {
      this.userProfileDetails = data;
      console.log(
        'Profile detatils of ',
        id,
        ' by get : ',
        data,
        '  ..... ',
        this.myAccount
      );
    });
  }
  isLoadUserProfileFirstTime = true;
  updateProfile() {
    console.log("isLoadUserProfileFirstTime - "+this.isLoadUserProfileFirstTime);
    if (this.isLoadUserProfileFirstTime === true) {
      this.myAccountService
        .createUserProfileDetails(this.userProfileDetails)
        .subscribe(
          (data) => {
            console.log('Update profile data : ', data);
            this.userProfileDetails = new UserProfile();
            this.toastr.success('Details Updated Successfully!', 'Success');
            this.isLoadUserProfileFirstTime = false;
          },
          (error) => {
            this.toastr.error('Details cannot be updated!', 'Error');
          }
        );
    } else {
      console.log("isLoadUserProfileFirstTime - "+this.isLoadUserProfileFirstTime);
      
      this.myAccountService
        .updateUserProfileDetails(this.myAccount.uuid,this.userProfileDetails)
        .subscribe(
          (data) => {
            console.log('Update profile data : ', data);
            this.userProfileDetails = new UserProfile();
            this.toastr.success('Details Updated Successfully!', 'Success');
            this.isLoadUserProfileFirstTime = false;
          },
          (error) => {
            this.toastr.error('Details cannot be updated!', 'Error');
          }
        );
    }
  }

  isImageSelected: boolean = false;
  selectFile(event) {
    this.isImageSelected = true;
    console.log('inside selectFile');
    console.log(event);

    if (event.target.files) {
      console.log('inside if');

      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.urlLink = event.target.result;
        console.log(this.urlLink);
        this.toastr.success('Image updated Successfully!', 'success');
      };
    }
  }
  goToResetPassword: boolean = false;
  oldPassword;
  newPassword;

  confirmPassword;
  errorModel: ErrorModel = new ErrorModel();
  changePasswordOnRequest() {
    console.log(
      'this.oldPassword; ' +
        this.oldPassword +
        ' new pass ' +
        this.newPassword +
        ' user ' +
        this.myAccount.username
    );
    let changePassword: ChangeUserPassword = new ChangeUserPassword();
    changePassword.oldPassword = this.oldPassword;
    changePassword.newPassword = this.newPassword;
    let user = this.myAccount.username;
    this.changePasswordService
      .changeUserPassword(user, changePassword)
      .subscribe(
        (data) => {
          console.log(data);
          this.router.navigate(['/login']);
          this.toastr.success('Password Changed Successfully!', 'Login Again');
        },
        (error) => {
          this.errorModel = error.error;
          this.toastr.error(`${this.errorModel.userInterfaceMessage}`, 'Error');
          console.log(error);
        }
      );
  }
  showPassword = false;
  showType = false;
  toggleShow() {
    this.showPassword = !this.showPassword;
    this.showType = !this.showType ? true : false;
  }
}
