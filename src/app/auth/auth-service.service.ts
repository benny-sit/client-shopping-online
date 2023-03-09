import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentUserInterface, loginRequestInterface, registerRequestInterface } from './types.interface';
import { Observable, of } from 'rxjs';

const BASE_URL = 'http://localhost:3001/'

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: loginRequestInterface): Observable<CurrentUserInterface>{
    const url = BASE_URL + 'auth/login';
    return this.http.post<CurrentUserInterface>(url, data);
  }

  register(data: registerRequestInterface): Observable<CurrentUserInterface> {
    const url = BASE_URL + 'auth/register';
    return this.http.post<CurrentUserInterface>(url, data);
  }

  refresh(): Observable<CurrentUserInterface> {
    const token = window.localStorage.getItem('accessToken') || '';

    // if(!token) return of(null);

    const headers =new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const url = BASE_URL + 'auth/refresh';
    return this.http.get<CurrentUserInterface>(url, { headers});
  }
}
