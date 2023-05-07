import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserInfoService } from 'src/app/service/userInfo.services';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent implements OnInit {
  // userinfo : UserInfo = new UserInfo();

  boolVar:boolean = false;
  userinfo: UserInfo;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router,private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.userinfo = new UserInfo();

    this.id = this.route.snapshot.params['id'];

    this.userInfoService.getUserInfo(this.id)
      .subscribe(data => {
        console.log(data)
        this.userinfo = data;
      }, error => console.log(error));
  }
  enable() {
    this.router.navigate(["user-info"])
  }
  enable1() {
    this.router.navigate(["user-info/view-user-info"])
  }

  updateUserInfo() {
    this.userInfoService.updateUserInfo(this.id, this.userinfo)
      .subscribe(data => {
        console.log(data);
        this.userinfo = new UserInfo();
      }, error => console.log(error));

      this.boolVar=true;
  }
  list(){
    this.router.navigate(['user-info/view-user-info']);
  }

}
