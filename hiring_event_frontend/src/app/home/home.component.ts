import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthGuard } from '../guard/auth.guard';
import { LogOutService } from '../service/logout.service';
import { RoleService } from '../service/roles.services';
import { DatePipe } from '@angular/common';
import { UserInfo } from '../Models/userinfo.model';
import { MostAppliedJob } from '../service/mostAppliedJob.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  myDate = new Date();
  myDateStr : string;
  title = 'Hiring-service v2.0';
  isDropdownOpen=false;
  username : any= "user";
  saleData = [
    { name: "Java Dev", value: 100 },
    { name: "C++/.Net", value: 55 },
    { name: "Python Dev", value: 200 },
    { name: "HR", value: 7 },
    { name: "Management", value: 40 }
  ];
  constructor(private router : Router, private logoutService : LogOutService , private authGuard : AuthGuard,
    private toster : ToastrService, private datePipe : DatePipe, private mostAppliedJob :MostAppliedJob) {
      this.myDateStr = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
     }

  ngOnInit(): void {
    this.mostAppliedJob.getMostAppliedJob().subscribe((data)=>{
      console.log("Top 5 most applied jobs ", data);
      
    })
    this.checkUserProfileStatus();
    console.log("SessionStorege items - "+sessionStorage.getItem("role"));
    
  }

  //check if userProfileDetails is null
  async checkUserProfileStatus() {
    const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms));
    await sleep(5500);
      this.authGuard.getUserDetails().subscribe((data) => {
        console.log("home ",data);
        this.username = data.username;
          if(data.userProfile === null){
              this.toster.warning("<b>Please Set User Profile Details in MyAccount Section</b>", "", {
                enableHtml : true,
                progressAnimation : 'decreasing',
                positionClass : 'toast-top-center',
                easing : 'ease-in',
                easeTime : '800',
                timeOut : 6000
              });
          }
      })
  }
  onLoadSkillSet() {
   this.router.navigate(['/skill-set'])
  }
  onLoadJobDetails() {
    this.router.navigate(['/job-details'])
  }
  checkSession(...args:string[]){
    const rolesStrFromLocalStorage = sessionStorage.getItem('role');
    var matches = rolesStrFromLocalStorage.split(',');
    console.log("matches ", matches);
    for (let i = 0; i < matches.length ; i++){
        for (let j = 0; j < args.length ; j++){
            if(matches[i] === args[j]) {
                return  true;
            }
        }
    }
    return false
  }
}
