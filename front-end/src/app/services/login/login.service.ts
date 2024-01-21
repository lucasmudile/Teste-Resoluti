import { Injectable } from '@angular/core';
import { ENV } from 'src/enviroments/enviroment.dev';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/interfaces/Login';
import { Observable,catchError,of, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';

const auth_token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJMdWNhc3NhbnRhbmFAZ2FsaWxlaWEuY28uYW8iLCJqdGkiOiIwYzE3ZDcwZi00MmJlLTRmNDQtOWM0Yy1mMWFhYjEzNGY1NjEiLCJlbWFpbCI6Imx1Y2FzbXVkaWxlQGdtYWlsLmNvbSIsInVpZCI6IjMzZTAxMGI3LWU1NjItNDI2Ny1hMzQ3LTA2OTE0MDUxOTIzYiIsImlwIjoiMTkyLjE2OC4wLjg5IiwiZG9taW5pb0lkIjoiYTYyZjBiZTEtY2M3Yi00MWZmLWJjYzEtNGVjYjYzZDcxYjViIiwicm9sZXMiOiJBZG1pbiIsImV4cCI6MTY5OTMyODA0NSwiaXNzIjoiQ29yZUlkZW50aXR5IiwiYXVkIjoiQ29yZUlkZW50aXR5VXNlciJ9.hYh5MPJk7XonJvePIHx73nO34beAIAfQg8nhDTw_ZK4';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth_token}`,
  }),
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http:HttpClient) { }

  Login(login: Login): Observable<any> {
    return this.http.post<any>(`${ENV.apiURL}User/authentication`, login);
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
