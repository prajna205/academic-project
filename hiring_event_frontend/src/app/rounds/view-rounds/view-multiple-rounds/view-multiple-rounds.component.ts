import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InterviewDetails } from 'src/app/Models/interviewDetails.model';
import { InterviewRounds } from 'src/app/Models/interviewRounds.model';
import { JobDetails } from 'src/app/Models/jobdetails.model';
import { InterviewRoundService } from 'src/app/service/interview-round.services';
import { JobDetailsService } from 'src/app/service/jobdetails.services';

@Component({
  selector: 'app-view-multiple-rounds',
  templateUrl: './view-multiple-rounds.component.html',
  styleUrls: ['./view-multiple-rounds.component.css']
})
export class ViewMultipleRoundsComponent implements OnInit {
  interviewRounds: Observable<InterviewRounds[]>;
  interviewRound: InterviewRounds;
  updateInterviewRound: InterviewRounds;
  interviewDetails: InterviewDetails = new InterviewDetails();
  id: number;
  boolVar: boolean = false;
  modalFlag: boolean = false;
  jobDetails: Observable<JobDetails[]>;

  constructor(private interviewRoundService: InterviewRoundService,
    private route: ActivatedRoute, private router: Router,
  private toastr : ToastrService,
  private jobDetailsService: JobDetailsService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    this.interviewRound = new InterviewRounds();
    this.updateInterviewRound = new InterviewRounds();

    this.reloadData();
  }

  viewSingleRoundModal(id: any) {
    this.interviewRound = new InterviewRounds();
    this.updateInterviewRound = new InterviewRounds();
    this.interviewRound.id = id;
    var index = id;
    this.interviewRoundService.getInterviewRound(this.interviewRound.id)
      .subscribe(data => {
        console.log(data)
        this.interviewRound = data;
        this.updateInterviewRound = data;
      }, error => console.log(error));

  }
  reloadData() {
    this.jobDetails = this.jobDetailsService.getJobDetailsList();
    console.log("jobdetails observbl" + this.jobDetails);
    this.interviewRounds = this.interviewRoundService.getInterviewRoundList();
  }
  updateInterviewRoundDetails(updateId: number) {
    this.interviewRoundService.updateInterviewRound(updateId, this.interviewRound)
      .subscribe(data => {
        console.log(data);
        this.interviewRound = new InterviewRounds();
      this.toastr.success('Interview Details Updated Successfully!', 'Success');
      this.reloadData();
      }, error => console.log(error));
      // setTimeout(data => {
      //   window.location.reload();
      // },500)
  }
  deleteInterviewRound(id: number) {
      this.interviewRoundService.deleteInterviewRound(id).subscribe(
        (data) => {
          console.log(data);
          this.reloadData();
        },
        (error) => console.log(error)
      );
  }
}
