import { UserStatus } from "./userStatus.model";

export class Login{
   'username':string;
   'password':string;
    'status': UserStatus;
    'resetPasswordToken':string;
}
