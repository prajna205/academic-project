import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/Models/applicant.model';
import { ApplicantService } from 'src/app/service/applicant.services';
import { JobDetailsService } from 'src/app/service/jobdetails.services';
import { LogOutService } from 'src/app/service/logout.service';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {
  applicants: Observable<Applicant[]>;
  boolVar: boolean = false;
  id: number;
  job : string;
  getVal : boolean = false;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private applicantService: ApplicantService,
    private logoutService : LogOutService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reloadData();
  }

  async reloadData() {
    const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms));
    this.getVal = true;
    await sleep(4000);
    this.applicants = this.applicantService.viewApplicants(this.id);
    this.getVal = false;
    console.log("this.applicants   ",this.applicants);
  }
// pending solve this
  resumeDownload(resumePath : string){
    console.log("resumePath - "+resumePath);
    
    this.applicantService.downloadResume(resumePath).subscribe((data)=>{
        console.log(data);
        
    });
  }

}
