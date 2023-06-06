import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../interfaces/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: String = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products').pipe(
      map((response) =>
        response.map((product) => {
          if (product.discount) {
            product.discountedPrice =
              product.price - (product.price * product.discount) / 100;
          }
          return product;
        })
      )
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id).pipe(
      map((product) => {
        if (product.discount) {
          product.discountedPrice =
            product.price - (product.price * product.discount) / 100;
        }
        return product;
      })
    );
  }
}
