import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export default class LoginService{
  private baseUrl= 'http://localhost:8085';
  constructor(private http : HttpClient){}

  login(loginCred: Object):Observable<Object>{
      // return this.http.post(`${this.baseUrl}/open-login/authenticate`,loginCred , {observe: 'response' });
      return this.http.post(`${this.baseUrl}/open-login/authenticate`,loginCred , {responseType:'text' })
      // .pipe(
      //   catchError(this.handleError)
      // );

}

// private handleError(error: HttpErrorResponse) {
//   if (error.status === 0) {
//     // A client-side or network error occurred. Handle it accordingly.
//     console.error('An error occurred:', error.error);
//   } else {
//     // The backend returned an unsuccessful response code.
//     // The response body may contain clues as to what went wrong.
//     console.error(
//       `Backend returned code ${error.status}, body was: `, error.error);
//   }
//   // Return an observable with a user-facing error message.
//   return throwError(() => new Error('Something bad happened; please try again later.'));
// }
}
