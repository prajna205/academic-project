import { Component, OnInit } from '@angular/core';
import { JobDetailsSkillSetMapping } from '../Models/jobdetailsSkillSetMapping.model';
import { JobdetailsSkillSetmappingService } from 'src/app/service/jobdetailsSkillSetMapping.services';
import { SkillSet } from '../Models/skillset.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SkillSetService } from '../service/skillset.services';

@Component({
  selector: 'app-jobdetails-skillset-mapping',
  templateUrl: './jobdetails-skillset-mapping.component.html',
  styleUrls: ['./jobdetails-skillset-mapping.component.css']
})
export class JobdetailsSkillsetMappingComponent implements OnInit {
  jobdetailsSkillSetMapping: JobDetailsSkillSetMapping = new JobDetailsSkillSetMapping();
  boolVar: boolean = false;
  skillsets: SkillSet[];
  form: FormGroup;
  id: number;
  skillset: SkillSet = new SkillSet();
  enable1: number[] = [];
  enable: SkillSet[] = [];
  mySubscription: any;
  constructor(private jobdetailsSkillSetmappingService: JobdetailsSkillSetmappingService,
    private fb: FormBuilder, private route: ActivatedRoute, private skillSetService: SkillSetService,
    private router: Router) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required])
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.reloadData();
    this.checkedOnRefresh();
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
  }

  reloadData() {
    this.skillsets = this.skillSetService.getSkillSetList();
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
  submitForm() {
    this.boolVar = true
    console.log(this.enable1);
    console.log(this.form.value.checkArray);
    let skillSet: SkillSet[] = [];
    for (let i = 0; i < this.form.value.checkArray.length; i++) {
      skillSet.push({ 'id': this.form.value.checkArray[i], 'skillName': null, 'description': null });
    }
    this.jobdetailsSkillSetMapping.skills = skillSet;
    this.jobdetailsSkillSetMapping.jobId = +this.route.snapshot.params['id'];
    this.jobdetailsSkillSetmappingService
      .createJobDetailsSkillSetMapping(this.jobdetailsSkillSetMapping).subscribe((data) => {
        console.log("data from post mapping : ");
        console.log(data);
        this.jobdetailsSkillSetMapping = new JobDetailsSkillSetMapping();
      },
        (error) => console.log(error));

    setTimeout(() => {
      this.boolVar = false
      this.router.navigate(['/job-details/edit-job-details', this.id])
    }, 2500);
  }
  checkedOnRefresh() {
    this.jobdetailsSkillSetMapping.jobId = +this.route.snapshot.params['id'];
    this.jobdetailsSkillSetmappingService.getSkillSetIds(this.jobdetailsSkillSetMapping.jobId).subscribe((data) => {
      console.log("from get mapping");
      console.log(data);
      this.enable = data.enabled;
      for (let i of this.enable) {
        this.enable1.push(i.id)
      }
      this.jobdetailsSkillSetMapping = data;
      for (let i = 0; i < this.enable1.length; i++) {
        this.form.value.checkArray[i] = this.enable1[i];
      }
    }, (error) => console.log(error));
  }


  check(e) {   //9 , 1
    for (let j = 0; j < this.enable1.length; j++) {
      if (e == this.enable1[j]) {
        return this.enable1[j];
      }
    }
  }
}
