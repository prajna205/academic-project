import { ApplicantStatus } from "./applicantStatus";

export class Applicant{
    id : number;
    panCard : string
    jobId : string;
    emailId: string
    resumePath : string
    status : ApplicantStatus
}