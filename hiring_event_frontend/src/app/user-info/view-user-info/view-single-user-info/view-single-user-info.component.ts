import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserInfoService } from 'src/app/service/userInfo.services';

@Component({
  selector: 'app-view-single-user-info',
  templateUrl: './view-single-user-info.component.html',
  styleUrls: ['./view-single-user-info.component.css']
})
export class ViewSingleUserInfoComponent implements OnInit {
  userInfo: UserInfo;
  id : number;

  constructor(private route: ActivatedRoute,private userInfoService : UserInfoService,private router: Router) { }

  ngOnInit(): void {
    this.userInfo= new UserInfo();

    this.id = this.route.snapshot.params['id'];
    
    this.userInfoService.getUserInfo(this.id)
      .subscribe(data => {
        console.log(data)
        this.userInfo = data;
      }, error => console.log(error));
  }

  enable() {
    this.router.navigate(["user-info"])
  }
  enable1() {
    this.router.navigate(["user-info/view-user-info"])
  }
  
  list(){
    this.router.navigate(['user-info/view-user-info']);
  }

}
