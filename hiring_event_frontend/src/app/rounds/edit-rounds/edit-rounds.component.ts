import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewDetails } from 'src/app/Models/interviewDetails.model';
import { InterviewRounds } from 'src/app/Models/interviewRounds.model';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserType } from 'src/app/Models/userType.model';
import { InterViewDetailsService } from 'src/app/service/interview-details.services';
import { InterviewRoundService } from 'src/app/service/interview-round.services';
import { UserInfoService } from 'src/app/service/userInfo.services';

@Component({
  selector: 'app-edit-rounds',
  templateUrl: './edit-rounds.component.html',
  styleUrls: ['./edit-rounds.component.css']
})
export class EditRoundsComponent implements OnInit {
  interviewRound : InterviewRounds;

  userInfos: Observable<UserInfo[]>;
  candidate = UserType[0];
  interviewer = UserType[1];
  boolVar:boolean = false;
  id: number;


  constructor(private route: ActivatedRoute, private router: Router,private interviewRoundService: InterviewRoundService,
    private userInfoService : UserInfoService, private interviewDetailsService: InterViewDetailsService) { }

  ngOnInit(): void {
    this.interviewRound = new InterviewRounds();
    this.id = +this.route.snapshot.params['id'];
    this.reloadData();
    this.interviewRoundService.getInterviewRound(this.id)
      .subscribe(data => {
        console.log(data)
        this.interviewRound = data;
      }, error => console.log(error));
  }
  reloadData() {
    this.userInfos = this.userInfoService.getUserInfoList();


    ////

    // this.interviewDetailsArr = this.interviewDetailsService.getInterviewDetailsList();
    // this.interviewDetailsService.getInterviewDetails(this.interviewID)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.interviewDetails = data;
    //     this.candidateEmailID =data.candidateEmail;

    //   }, error => console.log(error));
  }
  enable() {
    this.router.navigate(["interview-rounds", this.id])
  }
  enable1() {
    this.router.navigate(["interview-rounds/1/view-interview-rounds"])
  }

  updateInterviewRoundDetails() {
    this.interviewRoundService.updateInterviewRound(this.id, this.interviewRound)
      .subscribe(data => {
        console.log(data);
        this.interviewRound = new InterviewRounds();
      }, error => console.log(error));

      this.boolVar=true;
  }
  list(){
    this.router.navigate(['interview-rounds/3/view-interview-rounds']);
  }

}

