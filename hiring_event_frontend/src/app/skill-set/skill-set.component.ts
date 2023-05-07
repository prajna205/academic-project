import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SkillSet } from '../Models/skillset.model';
import { LogOutService } from '../service/logout.service';
import { SkillSetService } from '../service/skillset.services';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements OnInit {
  titleskillset = "SET YOUR SKILLS";
  skillset: SkillSet = new SkillSet();

  boolVar1: boolean = true;
  boolVar2: boolean = false;

  constructor(private skillsetService: SkillSetService, private router: Router,
    private toastr: ToastrService, private logoutService: LogOutService) { }

  ngOnInit(): void {
  }

  addAgain() {
    // this.submitted = false;


  }
  enable() {
    this.router.navigate(["skill-set"])
  }
  enable1() {
    this.router.navigate(["skill-set/view-skill-set"])
  }

  save() {
    this.skillsetService
      .createSkillSet(this.skillset).subscribe((data) => {
        console.log(data);
        this.skillset = new SkillSet();
        this.toastr.success('Skill Added Successfully!', 'Success');

      },
        (error) => {
          console.log(error);
          this.toastr.warning("This Skill Is Already Added.", "", {
            enableHtml: true,
            progressAnimation: 'decreasing',
            positionClass: 'toast-top-right',
            easing: 'ease-in',
            easeTime: '800',
            timeOut: 3000
          });
        });

  }

  // logout(){
  //   sessionStorage.removeItem('token');
  //   this.router.navigate(["/login"])

  // }

}
