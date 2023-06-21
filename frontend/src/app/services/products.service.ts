import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: String = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(
      this.url + `api/v1/products/products/${id}/get_product/`
    );
  }

  listProducts(): Observable<any> {
    return this.http.get<any>(
      this.url + 'api/v1/products/products/get_products'
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(this.url + 'api/v1/products/products/', product);
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      this.url + `api/v1/products/products/${id}/`,
      data
    );
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete<any>(this.url + `api/v1/products/products/${id}/`);
  }
}
