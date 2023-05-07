import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SkillSet } from 'src/app/Models/skillset.model';
import { LogOutService } from 'src/app/service/logout.service';
import { SkillSetService } from 'src/app/service/skillset.services';

@Component({
  selector: 'app-edit-skill-set',
  templateUrl: './edit-skill-set.component.html',
  styleUrls: ['./edit-skill-set.component.css']
})
export class EditSkillSetComponent implements OnInit {

  boolVar:boolean = false;
  skillset: SkillSet;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router,
    private skillsetService: SkillSetService,
    private toastr : ToastrService,
     private logoutService : LogOutService) { }

  ngOnInit(): void {
    this.skillset = new SkillSet();

    this.id = this.route.snapshot.params['id'];

    this.skillsetService.getSkillSet(this.id)
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

  updateSkillSet() {
    this.skillsetService.updateSkillSet(this.id, this.skillset)
      .subscribe(data => {
        console.log(data);
        this.skillset = new SkillSet();
        this.toastr.success('Skill Updated Successfully!', 'Success');
      }, error => {
        console.log(error);
        this.toastr.warning("This Skill Could Not Be Updated.", "", {
          enableHtml: true,
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-right',
          easing: 'ease-in',
          easeTime: '800',
          timeOut: 3000
        });
      });

      this.boolVar=true;
  }
  list(){
    this.router.navigate(['skill-set/view-skill-set']);
  }
  addUser(){
    this.router.navigate(["/create-user"])
  }

}
