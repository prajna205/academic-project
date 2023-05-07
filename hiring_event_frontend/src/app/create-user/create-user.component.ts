import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CreateUser } from 'src/app/models/createUser.model';
import { AuthGuard } from '../guard/auth.guard';
import { Applicant } from '../Models/applicant.model';
import { UserRole } from '../models/userRole.model';
import { UserStatus } from '../models/userStatus.model';
import { ApplicantService } from '../service/applicant.services';
import { CreateUserService } from '../service/createUser.service';
import { RoleService } from '../service/roles.services';
// import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserModel : CreateUser = new CreateUser();
  hide1: boolean = false;
  hide2: boolean = true;
  confirmPassword : string = "";
  show:boolean = false;
  applicant: Applicant = new Applicant();
  showPassword = false;
  showType = false;

  // @ContentChild(IonInput) input: IonInput;

  constructor(private createUserService : CreateUserService ,
    private applicantService: ApplicantService,
     private router : Router, private authGuard: AuthGuard) { }
  dropdownList :any = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  // dropdownSettings:any;

  ngOnInit(): void {
    console.log("applicant.id ",this.applicant.id);

    this.dropdownList = [  "ADMIN", "USER", "VISITOR", "HR", "INTERVIEWER", "CANDIDATE"];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  
  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
    console.log(this.selectedItems);

  }
  onItemDeSelect(item:any){
    let i = this.selectedItems.indexOf(item);
    console.log(this.selectedItems.indexOf(item));
    
    console.log(i);
    this.selectedItems.splice(i,1);
    console.log(this.selectedItems);

  }
  onSelectAll(items: any) {
    console.log(items);
  }
  createUser(){
    console.log(this.createUserModel);

    this.createUserService.createUser(this.createUserModel).subscribe((data : any  ) => {
      console.log(data);

      sessionStorage.removeItem('token');
      // this.router.navigate(["/login"])
      if(this.createUserModel.roles == UserRole.USER)
      console.log("applicant.id ",this.applicant.id);
      if(this.createUserModel.roles == UserRole.CANDIDATE ){
        this.changeApplicantStatus(this.createUserModel.username);
      }
      console.log();
      
      
    },error  =>
      console.error(error.message+" "+error.details)
    );
  }
  changeApplicantStatus(username :string){
    
  }
  hideDiv(){
    this.hide1 = true;
    this.hide2 = false;
}
fieldTextType: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}
toggleShow() {
  this.showPassword = !this.showPassword;
  this.showType = !this.showType ? true : false;
}

}
