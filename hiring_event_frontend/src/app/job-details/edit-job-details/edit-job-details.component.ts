import { Component, OnInit } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { JobDetails } from 'src/app/Models/jobdetails.model';
import { SkillSet } from 'src/app/Models/skillset.model';
import { JobDetailsService } from 'src/app/service/jobdetails.services';
import { LogOutService } from 'src/app/service/logout.service';
import { SkillSetService } from 'src/app/service/skillset.services';

@Component({
  selector: 'app-edit-job-details',
  templateUrl: './edit-job-details.component.html',
  styleUrls: ['./edit-job-details.component.css']
})
export class EditJobDetailsComponent implements OnInit {
  skillsets: Observable<SkillSet[]>;
  boolVar: boolean = false;
  jobdetails: JobDetails;
  id: number;
  form: FormGroup;
  minExpDate :any =new Date() ;
 

constructor(private route: ActivatedRoute,
  private router: Router, private skillSetService : SkillSetService,
  private jobDetailsService: JobDetailsService,
  private toastr : ToastrService,
  private logoutService : LogOutService) { }

ngOnInit(): void {
 let  dd :any = this.minExpDate.getDate();
 let  mm :any = this.minExpDate.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
 let  yyyy:any = this.minExpDate.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

this.minExpDate = yyyy + '-' + mm + '-' + dd;

  this.jobdetails = new JobDetails();
  this.id = +this.route.snapshot.params['id'];
  this.reloadData();
  this.jobDetailsService.getJobDetails(this.id)
    .subscribe(data => {
      console.log(data)
      this.jobdetails = data;
    }, error => console.log(error));

}

reloadData() {
  this.skillsets = this.skillSetService.getSkillSetList();
}

updateJobDetails() {
  this.jobDetailsService.updateJobDetails(this.id, this.jobdetails)
    .subscribe(data => {
      console.log(data);
      this.jobdetails = new JobDetails();
      this.toastr.success('Job Updated Successfully!', 'Success');

    }, error =>{
      console.log(error);
      this.toastr.warning("This job details could not be updated.", "", {
        enableHtml: true,
        progressAnimation: 'decreasing',
        positionClass: 'toast-top-right',
        easing: 'ease-in',
        easeTime: '800',
        timeOut: 3000
      });
    } 
    );

  this.boolVar = true;
}
list(){
  this.router.navigate(['job-details/view-job-details']);
}

enable() {
  this.router.navigate(["job-details"])
}
enable1() {
  this.router.navigate(["job-details/view-job-details"])
}

addUser(){
  this.router.navigate(["/create-user"])
}

}
