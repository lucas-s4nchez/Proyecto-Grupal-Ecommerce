import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen = false;
  constructor(public authService: AuthService) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  startLogout() {
    this.authService
      .startLogout(localStorage.getItem('token') ?? '')
      .subscribe({
        next: (data) => {
          console.log(data);
          this.authService.isAuthenticated = false;
          this.authService.user = null;
          this.authService.isAdmin = false;
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }
}
