import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = null;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isLoading: boolean = false;
  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  get formLoginState() {
    return {
      email: this.formLogin.get('email') as FormControl,
      password: this.formLogin.get('password') as FormControl,
    };
  }

  loginUser() {
    this.isLoading = true;
    this.authService
      .startLogin(
        this.formLoginState.email.value,
        this.formLoginState.password.value
      )
      .subscribe({
        next: (data) => {
          const { message, token, user } = data;

          this.isLoading = false;
          this.authService.isAuthenticated = true;
          this.authService.user = user;
          if (user.is_staff) {
            this.authService.isAdmin = true;
          }
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.toastr.success(message);
          this.router.navigate(['/home']);
        },
        error: (errors) => {
          this.isLoading = false;
          this.toastr.error(errors.error.message);
        },
      });
  }
}
