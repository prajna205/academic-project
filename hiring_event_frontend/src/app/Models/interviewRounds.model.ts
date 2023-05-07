import { InterviewStatus } from "./interviewStatus.model";

export class InterviewRounds{
    id : number;
    interviewId : number;
    candidateEmailId : string;
    interviewerEmailId : string;
    title : string;
    interviewDate : string;
    interviewTime : string;
    virtualLink : string;
    interviewFeedBack : string;
    status : InterviewStatus;
}