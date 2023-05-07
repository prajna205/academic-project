import { UserRole } from "./userRole.model";
import { UserStatus } from "./userStatus.model";

export class CreateUser{
  'uuid': string ;
  'username':string;
  'password':string;
  'roles':UserRole ;
   'status'= "DRAFT";
  //  'resetPasswordToken':string;
}
