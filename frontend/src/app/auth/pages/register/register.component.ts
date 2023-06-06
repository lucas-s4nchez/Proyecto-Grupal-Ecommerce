import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  isLoading: boolean = false;
  formRegister = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  get formRegisterState() {
    return {
      email: this.formRegister.get('email') as FormControl,
      name: this.formRegister.get('name') as FormControl,
      last_name: this.formRegister.get('last_name') as FormControl,
      password: this.formRegister.get('password') as FormControl,
    };
  }

  registerUser() {
    this.isLoading = true;
    this.authService
      .startRegister(
        this.formRegisterState.email.value,
        this.formRegisterState.name.value,
        this.formRegisterState.last_name.value,
        this.formRegisterState.password.value
      )
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          this.toastr.success(data?.message);
          this.router.navigate(['/auth/login']);
        },
        error: (errors) => {
          this.isLoading = false;
          Object.values(errors.error.errors).forEach((error: any) =>
            error.forEach((message: any) => {
              this.toastr.error(message);
            })
          );
        },
      });
  }
}
