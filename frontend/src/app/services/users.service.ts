import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: String = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  createUser(data: any): Observable<any> {
    return this.http.post(this.url + 'api/v1/users/', data);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.url + 'api/v1/users');
  }
}
