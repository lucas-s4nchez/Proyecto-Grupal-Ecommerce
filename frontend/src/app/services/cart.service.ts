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

  addProductToCart(productId: any, quantity: any): Observable<any> {
    return this.http.post(this.url + `api/v1/cart/cart/items`, {
      product_id: productId,
      quantity: quantity,
    });
  }

  updateQuantityProduct(cartItemId: any, quantity: any): Observable<any> {
    return this.http.patch<any>(
      this.url + `api/v1/cart/cart/items/${cartItemId}/`,
      { quantity: quantity }
    );
  }

  removeProductFromCart(cartItemId: any): Observable<any> {
    return this.http.delete<any>(
      this.url + `api/v1/cart/cart/items/${cartItemId}/`
    );
  }

  removeAllProductsFromCart(): Observable<any> {
    return this.http.delete<any>(this.url + `api/v1/cart/cart/items`);
  }
}
