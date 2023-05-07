import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ViewJobDetailsComponent } from './job-details/view-job-details/view-job-details.component';
import { ViewSkillSetComponent } from './skill-set/view-skill-set/view-skill-set.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditSkillSetComponent } from './skill-set/edit-skill-set/edit-skill-set.component';
import { EditJobDetailsComponent } from './job-details/edit-job-details/edit-job-details.component';
import { ViewSingleJobDetailsComponent } from './job-details/view-job-details/view-single-job-details/view-single-job-details.component';
import { ViewSingleSkillSetComponent } from './skill-set/view-skill-set/view-single-skill-set/view-single-skill-set.component';
import { JobdetailsSkillsetMappingComponent } from './jobdetails-skillset-mapping/jobdetails-skillset-mapping.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ViewUserInfoComponent } from './user-info/view-user-info/view-user-info.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { ViewInterviewDetailsComponent } from './interview-details/view-interview-details/view-interview-details.component';
import { ViewSingleInterviewDetailsComponent } from './interview-details/view-single-interview-details/view-single-interview-details.component';
import { RoundsComponent } from './rounds/rounds.component';
import { ViewRoundsComponent } from './rounds/view-rounds/view-rounds.component';
import { ViewSingleRoundsComponent } from './rounds/view-rounds/view-single-rounds/view-single-rounds.component';
import { ViewMultipleRoundsComponent } from './rounds/view-rounds/view-multiple-rounds/view-multiple-rounds.component';
import { ViewSingleUserInfoComponent } from './user-info/view-user-info/view-single-user-info/view-single-user-info.component';
import { EditUserInfoComponent } from './user-info/edit-user-info/edit-user-info.component';
import { EditInterviewDetailsComponent } from './interview-details/edit-interview-details/edit-interview-details.component';
import { EditRoundsComponent } from './rounds/edit-rounds/edit-rounds.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SpinnersAngularModule } from 'spinners-angular';
import { ApplicantComponent } from './applicant/applicant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewApplicantsComponent } from './applicant/view-applicants/view-applicants.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { MyAccountComponent } from './my-account/my-account.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { NgxChartsModule }from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    DashboardComponent,
    CreateUserComponent,
    JobDetailsComponent,
    SkillSetComponent,
    HomeComponent,
    ViewJobDetailsComponent,
    ViewSkillSetComponent,
    EditSkillSetComponent,
    EditJobDetailsComponent,
    ViewSingleJobDetailsComponent,
    ViewSingleSkillSetComponent,
    JobdetailsSkillsetMappingComponent,
    UserInfoComponent,
    ViewUserInfoComponent,
    InterviewDetailsComponent,
    ViewInterviewDetailsComponent,
    ViewSingleInterviewDetailsComponent,
    RoundsComponent,
    ViewRoundsComponent,
    ViewSingleRoundsComponent,
    ViewMultipleRoundsComponent,
    ViewSingleUserInfoComponent,
    EditUserInfoComponent,
    EditInterviewDetailsComponent,
    EditRoundsComponent,
    ModalComponent,
    WelcomeComponent,
    HeaderComponent,
    FooterComponent,
    ApplicantComponent,
    ViewApplicantsComponent,
    MyAccountComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    SpinnersAngularModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    NgOtpInputModule,
    NgxChartsModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
