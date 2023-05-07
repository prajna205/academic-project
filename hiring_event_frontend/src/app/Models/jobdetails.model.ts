import { ModelEntry } from "./modelEntry.model";

export class JobDetails extends ModelEntry{
     id : number;
     minExp : number;
     maxExp : number;
     hiringManagerEmail : string;
     jobExpiryDate: Date;
     numOfPositions: number;
     title: string;
     description: string;
     team: string;
     interviewerEmail : string;
}
