import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserInterface, loginRequestInterface, registerRequestInterface } from './types.interface';
import { Observable } from 'rxjs';

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
}
