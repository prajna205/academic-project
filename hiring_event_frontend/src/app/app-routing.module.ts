import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { ViewApplicantsComponent } from './applicant/view-applicants/view-applicants.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

import { HomeComponent } from './home/home.component';
import { EditInterviewDetailsComponent } from './interview-details/edit-interview-details/edit-interview-details.component';
import { InterviewDetailsComponent } from './interview-details/interview-details.component';
import { ViewInterviewDetailsComponent } from './interview-details/view-interview-details/view-interview-details.component';
import { ViewSingleInterviewDetailsComponent } from './interview-details/view-single-interview-details/view-single-interview-details.component';
import { EditJobDetailsComponent } from './job-details/edit-job-details/edit-job-details.component';
import { JobDetailsComponent } from './job-details/job-details.component';

import { ViewJobDetailsComponent } from './job-details/view-job-details/view-job-details.component';
import { ViewSingleJobDetailsComponent } from './job-details/view-job-details/view-single-job-details/view-single-job-details.component';
import { LoginComponent } from './login/login.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditRoundsComponent } from './rounds/edit-rounds/edit-rounds.component';
import { RoundsComponent } from './rounds/rounds.component';
import { ViewMultipleRoundsComponent } from './rounds/view-rounds/view-multiple-rounds/view-multiple-rounds.component';
import { ViewRoundsComponent } from './rounds/view-rounds/view-rounds.component';
import { ViewSingleRoundsComponent } from './rounds/view-rounds/view-single-rounds/view-single-rounds.component';
import { EditSkillSetComponent } from './skill-set/edit-skill-set/edit-skill-set.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { ViewSingleSkillSetComponent } from './skill-set/view-skill-set/view-single-skill-set/view-single-skill-set.component';
import { ViewSkillSetComponent } from './skill-set/view-skill-set/view-skill-set.component';
import { EditUserInfoComponent } from './user-info/edit-user-info/edit-user-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ViewSingleUserInfoComponent } from './user-info/view-user-info/view-single-user-info/view-single-user-info.component';
import { ViewUserInfoComponent } from './user-info/view-user-info/view-user-info.component';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppComponent },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['ADMIN'],
    },
  },
  // {path: 'reset-password', component : ResetPasswordComponent }
  { path: 'reset-password/:userName', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  // {path:'dashboard', redirectTo : 'http://localhost:49400/', pathMatch:'full',canActivate: [AuthGuard]},
  // {path: 'reset-password', component : ResetPasswordComponent},
  //  {path:'', redirectTo : '/login', pathMatch:'full'},
  { path: '', component: DashboardComponent },
  { path: 'application-developer-jobs', component: ApplicantComponent },
  {
    path: 'application-developer-jobs/view-applicants/:id',
    component: ViewApplicantsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'skill-set', component: SkillSetComponent, canActivate: [AuthGuard] },
  {
    path: 'skill-set/view-skill-set',
    component: ViewSkillSetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'skill-set/edit-skill-set/:id',
    component: EditSkillSetComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'job-details',
    component: JobDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['ADMIN'],
    },
  },

  {
    path: 'job-details/view-job-details',
    component: ViewJobDetailsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['ADMIN'],
    },
  },
  {
    path: 'job-details/edit-job-details/:id',
    component: EditJobDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'job-details/view-job-details/view-single-job-details/:id',
    component: ViewSingleJobDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'skill-set/view-skill-set/view-single-skill-set/:id',
    component: ViewSingleSkillSetComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard] },
  {
    path: 'user-info/view-user-info',
    component: ViewUserInfoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['ADMIN', 'USER'],
    },
  },
  {
    path: 'user-info/view-user-info/view-single-user-info/:id',
    component: ViewSingleUserInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-info/edit-user-info/:id',
    component: EditUserInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-details',
    component: InterviewDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-details/view-interview-details',
    component: ViewInterviewDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-details/view-single-interview-details/:id',
    component: ViewSingleInterviewDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-details/edit-interview-details/:id',
    component: EditInterviewDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-rounds/:id',
    component: RoundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-rounds/:id/edit-interview-rounds/:id',
    component: EditRoundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-rounds/:id/view-interview-rounds',
    component: ViewRoundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-rounds/view-interview-rounds/view-single-interview-round/:id',
    component: ViewSingleRoundsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'interview-rounds/view-interview-rounds/view-multiple-interview-round/:id',
    component: ViewMultipleRoundsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  // { path: "**", redirectTo: "page-not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
