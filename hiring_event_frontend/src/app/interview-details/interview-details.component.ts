import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Applicant } from '../Models/applicant.model';
import { InterviewDetails } from '../Models/interviewDetails.model';
import { JobDetails } from '../Models/jobdetails.model';
import { UserInfo } from '../Models/userinfo.model';
import { UserType } from '../Models/userType.model';
import { ApplicantService } from '../service/applicant.services';
import { InterViewDetailsService } from '../service/interview-details.services';
import { JobDetailsService } from '../service/jobdetails.services';
import { LogOutService } from '../service/logout.service';
import { UserInfoService } from '../service/userInfo.services';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrls: ['./interview-details.component.css']
})
export class InterviewDetailsComponent implements OnInit {

  titleInterviewDetails = "SET INTERVIEW DETAILS";
  submitted: boolean = false;
  jobdetails: Observable<JobDetails[]>;
  // userInfos: Observable<UserInfo[]>;
  // candidate = UserType[0];

  id: number;

  interviewDetails: InterviewDetails = new InterviewDetails();

  applicants: Observable<Applicant[]>;

  constructor(private interviewDetailsService: InterViewDetailsService,
    private route: ActivatedRoute, private jobDetailsService: JobDetailsService,
    // private userInfoService: UserInfoService,
    private router : Router, private logoutService : LogOutService,
    private toastr: ToastrService,
    private applicantService: ApplicantService) {

  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    console.log("id (jobid expected )- "+this.id);
    
    // console.log(UserType);
    // console.log(this.candidate);
    this.reloadData();
  }

  reloadData() {
    this.jobdetails = this.jobDetailsService.getJobDetailsList();
    // this.userInfos = this.userInfoService.getUserInfoList();
  }
  addAgain() {
    this.submitted = false;

  }
  enable() {
    this.router.navigate(["interview-details"])
  }
  enable1() {
    this.router.navigate(["interview-details/view-interview-details"])
  }

  save() {
    this.interviewDetailsService
      .createInterviewDetails(this.interviewDetails).subscribe((data) => {
        console.log(data);
        this.interviewDetails = new InterviewDetails();
        this.toastr.success('Interview Added Successfully!', 'Success');

      },
        (error) =>{ 
          console.log(error)
          this.toastr.warning("This Interview Is Already Added.", "", {
            enableHtml: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-right',
            easing: 'ease-in',
            easeTime: '800',
            timeOut: 3000
          });

        } );

    this.submitted = true;
  }

  onChange(id:number) {
    console.log('onchange() triggered..');
    console.log("id", id);
    this.id = id;
    console.log("this.id = "+this.id);
    this.getCandidateEmailIds();
    
    // this.file = event.target.files[0];
    // console.log("file name : "+this.file.name);
  }

  getCandidateEmailIds(){
    console.log("getCandidateEmailIds() - "+this.id);
    
    this.applicants = this.applicantService.viewApplicants(+this.id);
    console.log(this.applicants);
    
  }

  addUser(){
    this.router.navigate(["/create-user"])
  }
}
