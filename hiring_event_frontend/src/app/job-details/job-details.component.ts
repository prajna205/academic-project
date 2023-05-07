import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorModel } from '../Models/errorModel.model';
import { JobDetails } from '../Models/jobdetails.model';
import { JobDetailsService } from '../service/jobdetails.services';
import { LogOutService } from '../service/logout.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobdetailstitle = "DETAILS OF JOB";

  jobdetails: JobDetails = new JobDetails();

  submitted: boolean = false;

  
  form: FormGroup;
  
  errorModel: ErrorModel;
  error : boolean;
  minExpDate :any =new Date() ;

  constructor(private jobDetailsService: JobDetailsService,
    private  router : Router, 
    private logoutService : LogOutService,
    private toastr: ToastrService
    ) { }

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
  }

  addAgain() {
    this.submitted = false;
  }
  enable() {
    this.router.navigate(["job-details"])
  }
  enable1() {
    this.router.navigate(["job-details/view-job-details"])
  }

  save() {
    this.jobDetailsService
      .createJobDetails(this.jobdetails).subscribe((data) => {
        console.log(data);
        this.jobdetails = new JobDetails();
        this.toastr.success('Job Added Successfully!', 'Success');
        this.error = false;
      },
        (error) => {
          console.log(error)
          this.error = true;
          // this.toastr.error(`${this.errorModel.userInterfaceMessage}`, "Error");
          this.toastr.warning("This Job Is Already Added.", "", {
            enableHtml: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-right',
            easing: 'ease-in',
            easeTime: '800',
            timeOut: 3000
          });
        
        });

    this.submitted = true;
  }

  onCheckboxChange(e) {
    if (e.target.checked) {
      this.form.value.checkArray.push(+e.target.value);
      console.log(this.form.value.checkArray);

    }
    if (!e.target.checked) {
      console.log("e.target.value");
      console.log(e.target.value);
      this.form.value.checkArray.forEach((element, index) => {
        if (element == e.target.value) this.form.value.checkArray.splice(index, 1);
      });
      console.log(this.form.value.checkArray);
    }
  }

  addUser(){
    this.router.navigate(["/create-user"])
  }
}
