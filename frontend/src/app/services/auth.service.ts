import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: String = 'http://localhost:8000/';
  user = JSON.parse(localStorage.getItem('user')!) || null;
  token = localStorage.getItem('token') || null;
  refresh_token = localStorage.getItem('refresh_token') || null;
  isAuthenticated = localStorage.getItem('token') ? true : false;
  isAdmin = this.user?.is_staff ? this.user.is_staff : false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}
  ngOnInit() {
    this.checkLocalStorage();
  }
  notAuthenticatedUser() {
    this.user = null;
    this.token = null;
    this.refresh_token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
  }
  authenticatedUser(user: any, token: string, refresh_token: string) {
    this.isAuthenticated = true;
    this.user = user;
    this.token = token;
    this.refresh_token = refresh_token;
    if (user.is_staff) {
      this.isAdmin = true;
    }
  }
  removeLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
  addLocalStorage(user: any, token: string, refresh_token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  checkLocalStorage() {
    if (
      this.isAuthenticated &&
      (!localStorage.getItem('token') ||
        !localStorage.getItem('refresh_token') ||
        !localStorage.getItem('user'))
    ) {
      this.removeLocalStorage();
      this.notAuthenticatedUser();
      this.startLogout();
      this.router.navigate(['/']);
    }
  }
  isTokenValid(token: string): boolean {
    // Verifica si el token está expirado utilizando el servicio JwtHelper
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);

    // Devuelve true si el token no está expirado
    return !isTokenExpired;
  }
  startLogin(email: string, password: string): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/login', {
      email: email,
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
  startLogout(): Observable<any> {
    return this.http.post(this.url + 'api/v1/auth/logout', {});
  }
  startRefreshTokens() {
    const refreshToken = localStorage.getItem('refresh_token');

    return this.http.post<any>(this.url + 'api/v1/auth/refresh-token/', {
      refresh: refreshToken,
    });
  }
}
