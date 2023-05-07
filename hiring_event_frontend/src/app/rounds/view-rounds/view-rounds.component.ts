import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InterviewRounds } from 'src/app/Models/interviewRounds.model';
import { InterviewRoundService } from 'src/app/service/interview-round.services';

@Component({
  selector: 'app-view-rounds',
  templateUrl: './view-rounds.component.html',
  styleUrls: ['./view-rounds.component.css']
})
export class ViewRoundsComponent implements OnInit {

  interviewRounds: Observable<InterviewRounds[]>;
  boolVar : boolean = false;
  id:number;
  
  constructor(private interviewRoundService : InterviewRoundService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.reloadData();
  }
  enable() {
    this.id = this.route.snapshot.params["id"];
    this.router.navigate(["interview-rounds", this.id])
  }
  enable1() {
    this.router.navigate(["interview-rounds/1/view-interview-rounds"])
  }
  reloadData() {
    this.interviewRounds = this.interviewRoundService.getInterviewRoundList();
  }

  deleteInterviewRound(id: number) {
    this.boolVar = confirm("Are You Sure to Delete ?");
    if (this.boolVar === true) {
      this.interviewRoundService.deleteInterviewRound(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }
  }

  viewInterviewRound(id: number) {
    this.router.navigate(['interview-rounds/view-interview-rounds/view-single-interview-round', id]);
  }

  
  
  updateInterviewRound(id: number) {
    this.router.navigate(['interview-rounds/2/edit-interview-rounds', id]);
  }

}
