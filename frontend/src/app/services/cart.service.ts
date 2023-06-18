import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url: String = 'http://localhost:8000/';
  cart: any = null;
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get<any>(this.url + 'api/v1/cart/cart');
  }

  setCart(cart: any) {
    this.cart = cart;
  }
}
