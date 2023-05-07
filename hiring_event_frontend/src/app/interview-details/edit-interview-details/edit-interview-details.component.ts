import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/Models/applicant.model';
import { InterviewDetails } from 'src/app/Models/interviewDetails.model';
import { JobDetails } from 'src/app/Models/jobdetails.model';
import { UserInfo } from 'src/app/Models/userinfo.model';
import { UserType } from 'src/app/Models/userType.model';
import { ApplicantService } from 'src/app/service/applicant.services';
import { InterViewDetailsService } from 'src/app/service/interview-details.services';
import { JobDetailsService } from 'src/app/service/jobdetails.services';
import { LogOutService } from 'src/app/service/logout.service';
import { UserInfoService } from 'src/app/service/userInfo.services';

@Component({
  selector: 'app-edit-interview-details',
  templateUrl: './edit-interview-details.component.html',
  styleUrls: ['./edit-interview-details.component.css'],
})
export class EditInterviewDetailsComponent implements OnInit {
  interviewDetail: InterviewDetails;
  id: number;

  jobdetails: Observable<JobDetails[]>;

  applicants: Observable<Applicant[]>;

  jobDetailsId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private interviewDetailsService: InterViewDetailsService,
    private jobDetailsService: JobDetailsService,
    // private userInfoService: UserInfoService,
    private logoutService: LogOutService,
    private toastr: ToastrService,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.interviewDetail = new InterviewDetails();
    this.id = +this.route.snapshot.params['id'];
    this.interviewDetailsService.getInterviewDetails(this.id).subscribe(
      (data) => {
        this.interviewDetail = data;
        this.jobDetailsId = this.interviewDetail.jobDetailsId;
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }

  reloadData() {
    this.jobdetails = this.jobDetailsService.getJobDetailsList();
    this.getCandidateEmailIds(this.jobDetailsId);
    // this.userInfos = this.userInfoService.getUserInfoList();
  }
  enable() {
    this.router.navigate(['interview-details']);
  }
  enable1() {
    this.router.navigate(['interview-details/view-interview-details']);
  }

  updateInterviewDetails() {
    this.interviewDetailsService
      .updateInterviewDetails(this.id, this.interviewDetail)
      .subscribe(
        (data) => {
          console.log(data);
          this.interviewDetail = new InterviewDetails();
        this.toastr.success('Interview Details Updated Successfully!', 'Success');

        },
        (error) =>{
          console.log(error);
          this.toastr.warning("This Interview Details Could Not Be Updated.", "", {
            enableHtml: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-right',
            easing: 'ease-in',
            easeTime: '800',
            timeOut: 3000
          });
        }
      );

  }
  list() {
    this.router.navigate(['interview-details/view-interview-details']);
  }

  onChange(id: number) {
    // the call will come inside onChange if jobdetails needs to be updated
    console.log('onchange() triggered..');
    console.log('id', id);
    this.jobDetailsId = id;
    console.log('this.id = ' + this.id);
    this.getCandidateEmailIds(id);

    // this.file = event.target.files[0];
    // console.log("file name : "+this.file.name);
  }

  getCandidateEmailIds(id: number) {
    // case 1 : directly called - onPage load
    // case 2 : from onChange() if user needs to change the job then accordingly the candidate email will be changed
    console.log('getCandidateEmailIds() - ' + id);
    id = this.jobDetailsId;
    this.applicants = this.applicantService.viewApplicants(id);
    console.log(this.applicants);
  }
  addUser() {
    this.router.navigate(['/create-user']);
  }
}
