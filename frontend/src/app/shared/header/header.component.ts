import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  isMenuOpen = false;
  isAuthenticated = this.authService.isAuthenticated;
  isAdmin = this.authService.isAdmin;

  refreshToken() {
    // se ejecuta solo cuando hay un usuario autenticado
    if (this.authService.isAuthenticated) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      // si no existe un token o un usuario en el localStorage no va a refrescar el token
      if (token && user) {
        this.authService.startRefreshTokens().subscribe({
          next: (data) => {
            const accessToken = data.access;
            const newRefreshToken = data.refresh;

            // Actualizar los tokens del servicio
            this.authService.token = accessToken;
            this.authService.refresh_token = newRefreshToken;

            // Actualizar los tokens en el localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh_token', newRefreshToken);
          },
          error: (errors) => {
            // Manejar el error de refresco de tokens
            if (errors.status === 401) {
              this.authService.startLogout();
              this.toastr.success('La sesión ha terminado');
            }
          },
        });
      }
    }
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  logout() {
    this.authService.startLogout();
    this.toastr.success('La sesión ha terminado');
    this.isAuthenticated = this.authService.isAuthenticated;
    this.isAdmin = this.authService.isAdmin;
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.refreshToken();
    this.authService.checkLocalStorage();
  }
}
