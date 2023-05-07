import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillSet } from 'src/app/Models/skillset.model';
import { LogOutService } from 'src/app/service/logout.service';
import { SkillSetService } from 'src/app/service/skillset.services';

@Component({
  selector: 'app-view-single-skill-set',
  templateUrl: './view-single-skill-set.component.html',
  styleUrls: ['./view-single-skill-set.component.css']
})
export class ViewSingleSkillSetComponent implements OnInit {
  skillset: SkillSet;
  id : number;
  constructor(private route: ActivatedRoute,private skillSetService : SkillSetService,
    private router: Router, private logoutService : LogOutService) { }

  ngOnInit(): void {
    this.skillset= new SkillSet();

    this.id = this.route.snapshot.params['id'];

    this.skillSetService.getSingleSkillSet(this.id)
      .subscribe(data => {
        console.log(data)
        this.skillset = data;
      }, error => console.log(error));
  }
  enable() {
    this.router.navigate(["skill-set"])
  }
  enable1() {
    this.router.navigate(["skill-set/view-skill-set"])
  }
  list(){
    this.router.navigate(['skill-set/view-skill-set']);
  }
  addUser(){
    this.router.navigate(["/create-user"])
  }

}
