import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css'],
})
export class CategoryDashboardComponent {
  isLoading = false;
  categories: any = [];
  formCategory = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isLoading = true;
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
  }
  get formCategoryState() {
    return {
      name: this.formCategory.get('name') as FormControl,
      description: this.formCategory.get('description') as FormControl,
    };
  }
  addNewCategory() {
    this.categoriesService
      .createCategory({
        name: this.formCategoryState.name.value,
        description: this.formCategoryState.description.value,
      })
      .subscribe({
        next: (data) => {
          this.toastr.success('Categoria creada correctamente');
        },
        error: (errors) => {
          console.log(errors);
        },
      });
  }
  resetFormCategory() {
    this.formCategory.reset();
  }
}
