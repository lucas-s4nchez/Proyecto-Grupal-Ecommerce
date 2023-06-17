import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: String = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get<any>(this.url + 'api/v1/cart/cart');
  }
}
