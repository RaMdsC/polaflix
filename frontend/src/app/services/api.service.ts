import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpHeaders, HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "src/environments/environment.prod";

@Injectable({ providedIn: "root" })
export class ApiService {
  
  constructor(private httpClient: HttpClient) {

  }

  post<T>(partialUrl: string, rawBody: any) {
    // Construct full URL
    let url = `${environment.apiUrl}/${partialUrl}`;
    // Transform body into JSON
    let body = JSON.stringify(rawBody);
    // Establish JSON as application data
    let options = { headers: new HttpHeaders({
      "Content-Type": "application/json"
    }) };
    // Make the API call
    return this.httpClient.post<T>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = null;
    if(error.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = `Client side error - ${error.error.message} - Please try again later`;
    } else {
      // Server side error
      errorMessage = `Server side error - ${error.status}: ${error.error}`;
    }

    // Log and throw the error
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
