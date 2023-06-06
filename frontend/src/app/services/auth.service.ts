import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: String = 'http://localhost:8000/';
  user = JSON.parse(localStorage.getItem('user')!) || null;
  isAuthenticated = localStorage.getItem('token') ? true : false;
  isAdmin = this.user?.is_staff ? this.user.is_staff : false;

  constructor(private http: HttpClient) {}

  startLogin(email: string, password: string): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/login', {
      username: email,
      password: password,
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
  startLogout(token: string): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/logout', {
      token: token,
    });
  }
}
