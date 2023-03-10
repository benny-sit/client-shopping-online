import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cartItemInterface, categoriesInterface, storeItemInterface } from '../types.interface';

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

  getItems(search: string, categoryId: string, page: number): Observable<storeItemInterface[]> {
    const url = BASE_URL + 'item';
    const headers = this.getHeaders();

    return this.http.get<storeItemInterface[]>(url, {headers: headers, params: {page, categoryId, search}});
  }

  getCartItems(): Observable<{cartItems: cartItemInterface[]}> {
    const url = BASE_URL + 'cart';
    const headers = this.getHeaders();

    return this.http.get<{cartItems: cartItemInterface[]}>(url, {headers: headers});
  }

  getCartPrice(): Observable<{total: number}> {
    
    const url = BASE_URL + 'cart/price';
    const headers = this.getHeaders();

    return this.http.get<{total: number}>(url, {headers: headers});
  }

  // Cart Management 
  incCartItem(itemId: string): Observable<{cartItems: cartItemInterface[]}> {
    const url = BASE_URL + 'cart/inc';
    const headers = this.getHeaders();

    return this.http.post<{cartItems: cartItemInterface[]}>(url, {itemId: itemId} ,{headers: headers});
  }

  decCartItem(itemId: string): Observable<{cartItems: cartItemInterface[]}> {
    const url = BASE_URL + 'cart/dec';
    const headers = this.getHeaders();

    return this.http.post<{cartItems: cartItemInterface[]}>(url, {itemId: itemId}, {headers: headers});
  }

  changeCartItem(itemId: string, quantity: number): Observable<{cartItems: cartItemInterface[]}> {
    const url = BASE_URL + 'cart';
    const headers = this.getHeaders();

    return this.http.post<{cartItems: cartItemInterface[]}>(url, {itemId: itemId, quantity}, {headers: headers});
  }

  clearCart(): Observable<{cartItems: cartItemInterface[]}> {
    const url = BASE_URL + 'cart/clear';
    const headers = this.getHeaders();

    return this.http.delete<{cartItems: cartItemInterface[]}>(url, {headers: headers});
  }

  createOrder(last4digits: string): Observable<any> {
    const url = BASE_URL + 'order';
    const headers = this.getHeaders();

    last4digits = last4digits.slice(-4);

    return this.http.post<any>(url, {last4digits} ,{headers: headers});
  }

  // Admin

  createItem(item: storeItemInterface): Observable<any> {
    const url = BASE_URL + 'item';
    const headers = this.getHeaders();
    const {_id,  ...newItem} = item;
    console.log(item)

    return this.http.post<any>(url, {...newItem}, {headers: headers});
  }

  updateItem(item: storeItemInterface): Observable<any> {
    const url = BASE_URL + 'item';
    const headers = this.getHeaders();


    return this.http.put<any>(url, {...item}, {headers: headers});
  }

  deleteItem(itemId: string): Observable<any> {
    const url = BASE_URL + 'item';
    const headers = this.getHeaders();

    return this.http.delete<any>(url, {
      headers,
      body: {
        "_id": itemId,
      },
    });
  }

}
