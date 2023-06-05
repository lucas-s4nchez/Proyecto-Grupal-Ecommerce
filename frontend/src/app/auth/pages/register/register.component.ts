import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);
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
