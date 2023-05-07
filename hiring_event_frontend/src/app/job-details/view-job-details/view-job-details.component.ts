import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/Models/applicant.model';
import { JobDetails } from 'src/app/Models/jobdetails.model';
import { ApplicantService } from 'src/app/service/applicant.services';
import { JobDetailsService } from 'src/app/service/jobdetails.services';
import { LogOutService } from 'src/app/service/logout.service';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrls: ['./view-job-details.component.css'],
})
export class ViewJobDetailsComponent implements OnInit {
  jobdetails: Observable<JobDetails[]>;
  boolVar: boolean = false;
  id: number;
  applicants: any[] = [];
  getVal : boolean = false;
  jobdetail: JobDetails;
  searchText;
  

  constructor(
    private route: ActivatedRoute,
    private jobDetailsService: JobDetailsService,
    private router: Router,
    private logoutService: LogOutService,
    private applicantService: ApplicantService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reloadData();
  }
  enable() {
    this.router.navigate(['job-details']);
  }
  enable1() {
    this.router.navigate(['job-details/view-job-details']);
  }

  async reloadData() {
    // const sleep = ms => new Promise(
    //   resolve => setTimeout(resolve, ms));
    // this.getVal = true;
    // await sleep(4000);
    this.jobdetails = this.jobDetailsService.getJobDetailsList();
    this.getVal = false;
    this.jobdetails.forEach((i) => {
      i.forEach((j) => {
        this.applicantCount(j.id);
      });
    });
    console.log(this.applicants);

  }

  deleteJobDetails(id: number) {
    this.boolVar = confirm('Are You Sure to Delete ?');
    if (this.boolVar === true) {
      this.jobDetailsService.deleteJobDetails(id).subscribe(
        (data) => {
          console.log(data);
          this.reloadData();
        },
        (error) => console.log(error)
      );
    }
  }
  jobId : number;
  viewJobDetails(id: number) {
    // this.router.navigate([
    //   'job-details/view-job-details/view-single-job-details',
    //   id,
    // ]);
    
    this.jobdetail= new JobDetails();

    this.jobId = id;

    this.jobDetailsService.getSingleJobDetails(id)
      .subscribe(data => {
        console.log(data)
        this.jobdetail = data;
      }, error => console.log(error));
  }
  updateJobDetails(id: number) {
    this.router.navigate(['job-details/edit-job-details', id]);
  }
  applicantCount(id: number) {
    this.applicantService.countApplicantForJob(id).subscribe((data) => {
      this.applicants[id]=data;
    });
  }
  addUser() {
    this.router.navigate(['/create-user']);
  }
  viewApplicants(id : number){
    this.router.navigate(['/application-developer-jobs/view-applicants',id])
  }

  list(){
    this.router.navigate(['job-details/view-job-details']);
  }
}
