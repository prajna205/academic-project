import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewDetails } from 'src/app/Models/interviewDetails.model';
import { InterViewDetailsService } from 'src/app/service/interview-details.services';
import { LogOutService } from 'src/app/service/logout.service';

@Component({
  selector: 'app-view-interview-details',
  templateUrl: './view-interview-details.component.html',
  styleUrls: ['./view-interview-details.component.css']
})
export class ViewInterviewDetailsComponent implements OnInit {
  boolVar : boolean = false;
  interviewDetails: Observable<InterviewDetails[]>;
  id:number;
  constructor(private interviewDetailsService : InterViewDetailsService,private router: Router,
    private route: ActivatedRoute, private logoutService : LogOutService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reloadData();
  }
  enable() {
    this.router.navigate(["interview-details"])
  }
  enable1() {
    this.router.navigate(["interview-details/view-interview-details"])
  }
  reloadData() {
    this.interviewDetails = this.interviewDetailsService.getInterviewDetailsList();
  }

  deleteSkillSet(id: number) {
    this.boolVar = confirm("Are You Sure to Delete ?");
    if (this.boolVar === true) {
      this.interviewDetailsService.deleteInterviewDetails(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }

  updateSkillSet(id: number) {
    this.router.navigate(['interview-details/edit-interview-details', id]);
  }

  viewInterviewDetails(id: number) {
    this.router.navigate(['interview-details/view-single-interview-details', id]);
  }

  addUser(){
    this.router.navigate(["/create-user"])
  }
}
