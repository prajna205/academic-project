import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewDetails } from 'src/app/Models/interviewDetails.model';
import { InterviewRounds } from 'src/app/Models/interviewRounds.model';
import { JobDetails } from 'src/app/Models/jobdetails.model';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserType } from 'src/app/Models/userType.model';
import { InterViewDetailsService } from 'src/app/service/interview-details.services';
import { InterviewRoundService } from 'src/app/service/interview-round.services';
import { JobDetailsService } from 'src/app/service/jobdetails.services';
import { LogOutService } from 'src/app/service/logout.service';
import { UserInfoService } from 'src/app/service/userInfo.services';
import { UtilityService } from 'src/app/service/utility.services';

@Component({
  selector: 'app-view-single-interview-details',
  templateUrl: './view-single-interview-details.component.html',
  styleUrls: ['./view-single-interview-details.component.css']
})
export class ViewSingleInterviewDetailsComponent implements OnInit {
  interviewDetails: InterviewDetails;
  id : number;


  //from app-rounds

  // interviewDetails: InterviewDetails = new InterviewDetails();
  interviewDetailsArr: Observable<InterviewDetails[]>;

  jobDetails: Observable<JobDetails[]>;

  interviewRound: InterviewRounds = new InterviewRounds();
  // id : number;

  interviewID :number = +this.route.snapshot.params["id"];
  userInfos: Observable<UserInfo[]>;
  candidate = UserType[0];
  interviewer = UserType[1];
  candidateEmailID : string;
  submitted: boolean = false;
  boolVar: boolean = false;

  constructor(private route: ActivatedRoute,
    private interviewDetailsService : InterViewDetailsService,
    private utilityService : UtilityService,
    private router: Router,private interviewRoundService : InterviewRoundService,
    private userInfoService: UserInfoService, private logoutService : LogOutService,
    private jobDetailsService: JobDetailsService) { }

  ngOnInit(): void {
    this.interviewDetails= new InterviewDetails();

    this.id = +this.route.snapshot.params['id'];

    this.interviewDetailsService.getInterviewDetails(this.id)
      .subscribe(data => {
        console.log(data)
        this.interviewDetails = data;
      }, error => console.log(error));


    this.reloadData();
    console.log("inside ngOninit interviewID : "+this.interviewID);
    this.interviewID = +this.route.snapshot.params["id"];
    console.log("inside ngOninit interviewID v1: "+this.interviewID);
  }
  enable() {
    this.router.navigate(["interview-details"])
  }
  enable1() {
    this.router.navigate(["interview-details/view-interview-details"])
  }
  list(){
    this.router.navigate(['interview-details/view-interview-details']);
  }
  action(){
    this.id = +this.route.snapshot.params['id'];
    this.utilityService.utilityFunc(this.id);
    console.log(this.interviewDetails.jobDetailsId);

  }
  viewJobDetails(id: number){
    this.router.navigate(['job-details/view-job-details/view-single-job-details', id]);

  }
  reloadData() {
    this.userInfos = this.userInfoService.getUserInfoList();
    this.interviewDetailsArr = this.interviewDetailsService.getInterviewDetailsList();
    this.jobDetails = this.jobDetailsService.getJobDetailsList();
    this.interviewDetailsService.getInterviewDetails(this.interviewID)
      .subscribe(data => {
        console.log(data)
        this.interviewDetails = data;
        this.candidateEmailID =data.candidateEmail;

      }, error => console.log(error));
  }
  addAgain() {
    this.submitted = false;
  }
  reloadCurrentPage() {
    window.location.reload();

  }
  save() {
    this.interviewRound.interviewId = this.interviewID;
    this.interviewRound.candidateEmailId = this.candidateEmailID;
    console.log("interview id "+this.interviewRound.interviewId);

    this.interviewRoundService
      .createInterviewRound(this.interviewRound).subscribe((data) => {
        console.log(data);
        this.interviewRound = new InterviewRounds();
      },
        (error) => console.log(error));

        setTimeout(() => {
          this.reloadCurrentPage()
        }, 2500);
        this.boolVar= true;

    this.submitted = true;
  }

  addUser(){
    this.router.navigate(["/create-user"])
  }

}
