import { InterviewStatus } from "./interviewStatus.model";
import { ModelEntry } from "./modelEntry.model";

export class InterviewDetails extends ModelEntry {
    id: number;
    title: string; // INTERVIEW JAVA ENGG 2 | JOHN DOE | 6 YEARS
    jobDetailsId: number;
    candidateEmail: string;
    status: InterviewStatus;
}
