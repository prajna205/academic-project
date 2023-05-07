export class ErrorModel{
    errorMessage : string;          // technical message
    userInterfaceMessage : string; // non-technical message
    httpStatusCode : number;
    applicationErrorCode : number;
}