import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: String = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  startLogin(): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/login', {
      email: 'asdas@dada.com',
      password: '123123123',
    });
  }
  startRegister(
    email: string,
    name: string,
    last_name: string,
    password: string
  ): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/register', {
      email: email,
      name: name,
      last_name: last_name,
      password: password,
    });
  }
}
