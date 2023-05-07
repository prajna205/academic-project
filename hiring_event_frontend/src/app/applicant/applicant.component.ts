import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Applicant } from '../Models/applicant.model';
import { ApplicantStatus } from '../Models/applicantStatus';
import { JobDetails } from '../Models/jobdetails.model';
import { ApplicantService } from '../service/applicant.services';
import { JobDetailsService } from '../service/jobdetails.services';
import { ResumeStorageService } from '../service/resumeStorage.services';

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css'],
})
export class ApplicantComponent implements OnInit {
  jobdetails: Observable<JobDetails[]>;

  applicant: Applicant = new Applicant();
  isFetching: boolean = false;
  error = '';
  jobId: number;

  searchText;

  file: File = null;
  shortLink: string = "";
    

  constructor(
    private jobDetailsService: JobDetailsService,
    private applicantService: ApplicantService,
    private resumeStorageService: ResumeStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.jobdetails = this.jobDetailsService.getJobDetailsList();
  }

  apply(id: string) {
    console.log('inside apply method');

    this.applicant.jobId = id;
    console.log('job id ' + this.applicant.jobId);
  }

  onChange(event) {
    console.log('onchange() triggered..');
    this.isFetching = true;
    this.file = event.target.files[0];
    console.log("file name : "+this.file.name);
    
    this.resumeStorageService
      .createResumePath(this.file)
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.shortLink = event.link;
          console.log("event link : "+event.link);
          
          this.isFetching = false; // Flag variable
        }
      });
  }
  save() {
    console.log('applicant email : ' + this.applicant.emailId);
    console.log('applicant jobid : ' + this.applicant.jobId);
    this.applicant.resumePath = this.file.name;
    console.log('resume path : ' + this.applicant.resumePath);
    this.applicantService.createApplicant(this.applicant).subscribe(
      (data) => {
        // "file" : binaryData(add multipartHeader)

        console.log(data);
        this.applicant = new Applicant();
        this.applicant.status = ApplicantStatus.SUBMITTED;
        this.toastr.success('Applied Successfully!', 'Success');

      },
      // (error) => console.log(error)
    );
  }
}
