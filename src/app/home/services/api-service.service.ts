import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriesInterface } from '../types.interface';

const BASE_URL = 'http://localhost:3001/'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getHeaders() {
    const token = window.localStorage.getItem('accessToken') || '';
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  constructor(private http: HttpClient) { }

  getCategories(): Observable<categoriesInterface[]> {
    const url = BASE_URL + 'category';
    const headers = this.getHeaders();

    return this.http.get<categoriesInterface[]>(url, {headers: headers});
  }

  getItems(search: string, categoryId: string, page: number) {

  }

  getCartItems() {

  }

  getCartPrice() {
    
  }
}
