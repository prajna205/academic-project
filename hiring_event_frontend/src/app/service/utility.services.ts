import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthGuard } from "../guard/auth.guard";

@Injectable({
    providedIn: 'root'
})
export class UtilityService{
    // id : number;
    token;
    constructor(private router : Router, private authService : AuthGuard) {
        this.token = this.authService.getToken();
    }

    link : boolean = false;




    utilityFunc(id : number) {

        console.log("service 1 loded");
         this.link = true;
         this.router.navigate(["interview-rounds", id]);
    }
    utilityFunc1() {
        console.log("service 2 loded");

        this.router.navigate(["interview-details"])
        this.link = false;
        //  this.link = true;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
    log(arg0: string) {
        throw new Error("Method not implemented.");
    }
}
