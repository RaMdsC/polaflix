import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private httpClient: HttpClient) {

  }

  post<T>(partialUrl: string, rawBody: any) {
    // Construct full URL
    const url = `${environment.apiUrl}/${partialUrl}`;
    // Transform body into JSON
    const body = JSON.stringify(rawBody);
    // Specify JSON payload content type
    const options = { headers: new HttpHeaders().set(
      'Content-Type', 'application/json'
    ) };
    // Make the API call
    return this.httpClient.post<T>(url, body, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = null;
    if (error.error instanceof ErrorEvent) {
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
