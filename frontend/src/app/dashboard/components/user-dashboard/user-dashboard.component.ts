import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  users: any = [];
  userList: any = [];
  page = 1;
  pageSize = 3;
  collectionSize = this.users.length;
  formUser = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });
  constructor(
    private userService: UsersService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.getUsers();
  }

  get formUserState() {
    return {
      name: this.formUser.get('name') as FormControl,
      last_name: this.formUser.get('last_name') as FormControl,
      email: this.formUser.get('email') as FormControl,
      password: this.formUser.get('password') as FormControl,
    };
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.collectionSize = this.users.length;
        this.refreshUserList();
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
  }

  refreshUserList() {
    this.userList = this.users
      .map((user: any, i: any) => ({
        id: i + 1,
        ...user,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.resetFormUser();
  }

  addNewUser() {
    this.isSubmitting = true;
    this.userService
      .createUser({
        name: this.formUserState.name.value,
        last_name: this.formUserState.last_name.value,
        email: this.formUserState.email.value,
        password: this.formUserState.password.value,
      })
      .subscribe({
        next: (data) => {
          this.closeModal();
          this.isSubmitting = false;
          this.toastr.success(data.message);
          this.getUsers();
        },
        error: (errors) => {
          console.log(errors);
          this.isSubmitting = false;
        },
        complete: () => {},
      });
  }

  resetFormUser() {
    this.formUser.reset();
  }
}
