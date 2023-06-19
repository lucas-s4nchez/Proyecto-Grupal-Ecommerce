import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  url: String = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  createOrder(data: any): Observable<any> {
    return this.http.post(this.url + 'api/v1/order/order', data);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.url + 'api/v1/order/order');
  }

  getOrderById(orderId: any): Observable<any> {
    return this.http.get<any>(this.url + `api/v1/order/order/${orderId}`);
  }

  updateOrder(orderId: any, data: any): Observable<any> {
    return this.http.put<any>(
      this.url + `api/v1/order/order/${orderId}/`,
      data
    );
  }
}
