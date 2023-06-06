import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  get formLoginState() {
    return {
      email: this.formLogin.get('email') as FormControl,
      name: this.formLogin.get('name') as FormControl,
      last_name: this.formLogin.get('last_name') as FormControl,
      password: this.formLogin.get('password') as FormControl,
    };
  }

  registerUser() {
    this.authService
      .startRegister(
        this.formLoginState.email.value,
        this.formLoginState.name.value,
        this.formLoginState.last_name.value,
        this.formLoginState.password.value
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }
}
