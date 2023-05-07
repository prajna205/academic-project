import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserInfoService } from 'src/app/service/userInfo.services';

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styleUrls: ['./view-user-info.component.css']
})
export class ViewUserInfoComponent implements OnInit {


  userInfos : Observable<UserInfo[]>;
  boolVar: boolean;
  id: number;
  constructor(private userInfoService : UserInfoService,private router : Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.reloadData();
  }
  enable() {
    this.router.navigate(["user-info"]);
  }
  enable1() {
    this.router.navigate(["user-info/view-user-info"]);
  }

  reloadData() {
    this.userInfos = this.userInfoService.getUserInfoList();
    
  }

  deleteUserInfo(id: number) {
    this.boolVar = confirm("Are You Sure to Delete ?");
    if (this.boolVar === true) {
      this.userInfoService.deleteUserInfo(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }
  viewUserInfo(id: number){
    this.router.navigate(['user-info/view-user-info/view-single-user-info', id]);
    console.log(id);
    

  }
  updateUserInfo(id: number) {
    this.router.navigate(['user-info/edit-user-info', id]);
  }
}
