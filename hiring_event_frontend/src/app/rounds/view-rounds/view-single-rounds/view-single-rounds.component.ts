import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InterviewRounds } from 'src/app/Models/interviewRounds.model';
import { InterviewRoundService } from 'src/app/service/interview-round.services';

@Component({
  selector: 'app-view-single-rounds',
  templateUrl: './view-single-rounds.component.html',
  styleUrls: ['./view-single-rounds.component.css']
})
export class ViewSingleRoundsComponent implements OnInit {
  interviewRounds: InterviewRounds;
  id : number;
  constructor(private route: ActivatedRoute,private interviewRoundService : InterviewRoundService,private router: Router) { }

  ngOnInit(): void {
    this.interviewRounds= new InterviewRounds();

    this.id = this.route.snapshot.params['id'];

    this.interviewRoundService.getInterviewRound(this.id)
      .subscribe(data => {
        console.log(data)
        this.interviewRounds = data;
      }, error => console.log(error));
  }

  enable() {
    this.id = this.route.snapshot.params["id"];
    this.router.navigate(["interview-rounds", this.id])
  }
  enable1() {
    this.router.navigate(["interview-rounds/1/view-interview-rounds"])
  }
  list(){
    this.router.navigate(['interview-rounds/1/view-interview-rounds']);
  }
}
