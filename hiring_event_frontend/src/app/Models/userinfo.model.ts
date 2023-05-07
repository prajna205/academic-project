import { LoginProvider } from "./loginProvider.model";
import { UserType } from "./userType.model";

export class UserInfo{
    id: number;
    email : string;
    userType : UserType;
    loginProvider : LoginProvider;
    mockUser : boolean;
}