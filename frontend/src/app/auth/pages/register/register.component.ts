import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
    this.authService.startRegister('', '', '', '').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
