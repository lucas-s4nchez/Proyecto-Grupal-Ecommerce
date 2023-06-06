import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = null;
  constructor(private authService: AuthService) {
    this.authService.startLogin().subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
