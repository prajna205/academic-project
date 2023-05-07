import { UserProfile } from "./userProfile.model";
import { UserRole } from "./userRole.model";

export class UserAccount{
    username : string;
    password : string;
    roles : UserRole[];
    status : string;
    userProfile : UserProfile;
}