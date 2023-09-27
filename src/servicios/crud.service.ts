import { HttpClient, HttpHeaders, HttpErrorResponse, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  apiUrl: string = 'http://172.19.91.178:8843';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  
  constructor(private http: HttpClient) { }

   // Leer
   showTasks() {
    return this.http.get(`${this.apiUrl}`);
  }

  // buscar data
  buscar(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/buscar`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  // buscar data
  actualizar(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/update`;
    return this.http.post(API_URL, data).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}
