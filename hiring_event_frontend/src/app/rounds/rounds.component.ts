import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewDetails } from '../Models/interviewDetails.model';
import { InterviewRounds } from '../Models/interviewRounds.model';
import { JobDetails } from '../Models/jobdetails.model';
import { UserInfo } from '../Models/userinfo.model';
import { UserType } from '../Models/userType.model';
import { InterViewDetailsService } from '../service/interview-details.services';
import { InterviewRoundService } from '../service/interview-round.services';
import { JobDetailsService } from '../service/jobdetails.services';
import { UserInfoService } from '../service/userInfo.services';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.css']
})
export class RoundsComponent implements OnInit {
  interviewRoundTitle = "DETAILS OF INTERVIEW ROUNDS ";

  interviewDetails: InterviewDetails = new InterviewDetails();
  interviewDetailsArr: Observable<InterviewDetails[]>;

  interviewRound: InterviewRounds = new InterviewRounds();
  id : number;

  interviewID :number = +this.route.snapshot.params["id"];
  jobDetails: Observable<JobDetails[]>;
  candidate = UserType[0];
  interviewer = UserType[1];
  candidateEmailID : string;
  submitted: boolean = false;
  boolVar: boolean = false;
  boolVar1: boolean = true;
  boolVar2: boolean = false;
  constructor(private interviewRoundService : InterviewRoundService,private jobDetailsService: JobDetailsService,
    private interviewDetailsService : InterViewDetailsService,
    private route : ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.reloadData();
    console.log("inside ngOninit interviewID : "+this.interviewID);
    this.interviewID = +this.route.snapshot.params["id"];
    console.log("inside ngOninit interviewID v1: "+this.interviewID);
  }


  reloadData() {
    this.jobDetails = this.jobDetailsService.getJobDetailsList();
    console.log("jobdetails observbl"+this.jobDetails);
    
    this.interviewDetailsArr = this.interviewDetailsService.getInterviewDetailsList();
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
  enable() {
    this.id = this.route.snapshot.params["id"];
    this.router.navigate(["interview-rounds", this.id])
  }
  enable1() {
    this.router.navigate(["interview-rounds/1/view-interview-rounds"])
  }

  save() {
    this.interviewRound.interviewId = this.interviewID;
    console.log("interview id "+this.interviewRound.interviewId);
    this.interviewRound.candidateEmailId = this.candidateEmailID;
    this.interviewRoundService
      .createInterviewRound(this.interviewRound).subscribe((data) => {
        console.log(data);
        this.interviewRound = new InterviewRounds();
      },
        (error) => console.log(error));

    this.submitted = true;
  }

  action() {
    this.boolVar = true;
  }
}
