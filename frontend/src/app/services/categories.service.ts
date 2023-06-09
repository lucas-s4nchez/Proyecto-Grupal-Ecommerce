import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url: String = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  createCategory(data: any): Observable<any> {
    return this.http.post(this.url + 'api/v1/products/category/', data);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.url + 'api/v1/products/category');
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put<any>(
      this.url + `api/v1/products/category/${id}/`,
      data
    );
  }

  deleteCategory(id: any): Observable<any> {
    return this.http.delete<any>(this.url + `api/v1/products/category/${id}/`);
  }
}
