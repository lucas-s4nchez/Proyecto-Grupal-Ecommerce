import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-category-dashboard',
  templateUrl: './category-dashboard.component.html',
  styleUrls: ['./category-dashboard.component.css'],
})
export class CategoryDashboardComponent {
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  isDeleting: boolean = false;
  selectedCategoryId: number | null = null;
  categories: any = [];
  categoryList: any = [];
  page = 1;
  pageSize = 3;
  collectionSize = this.categories.length;
  formCategory = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.getCategories();
  }
  get formCategoryState() {
    return {
      name: this.formCategory.get('name') as FormControl,
      description: this.formCategory.get('description') as FormControl,
    };
  }

  getCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.collectionSize = this.categories.length;
        this.refreshCategoryList();
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
  }

  addNewCategory() {
    this.isSubmitting = true;
    this.categoryService.createCategory(this.formCategory.value).subscribe({
      next: (data) => {
        this.closeModal();
        this.isSubmitting = false;
        this.toastr.success('Categoria creada correctamente');
        this.getCategories();
      },
      error: (errors) => {
        this.isSubmitting = false;
        console.log(errors);
      },
    });
  }

  updateCategory() {
    this.isSubmitting = true;
    const categoryId = this.selectedCategoryId;
    this.categoryService
      .updateCategory(categoryId, this.formCategory.value)
      .subscribe({
        next: (data) => {
          this.closeModal();
          this.isSubmitting = false;
          this.toastr.success('Categoria actualizada correctamente');
          this.getCategories();
        },
        error: (errors) => {
          this.isSubmitting = false;
          console.log(errors);
        },
      });
  }

  deleteCategory() {
    this.isDeleting = true;
    this.categoryService.deleteCategory(this.selectedCategoryId).subscribe({
      next: (data) => {
        this.isDeleting = false;
        this.closeModal();
        this.toastr.success('Categoria eliminada');
        this.getCategories();
      },
      error: (errors) => {
        this.isDeleting = false;
        console.log(errors);
      },
    });
  }

  refreshCategoryList() {
    this.categoryList = this.categories
      .map((country: any, i: any) => ({
        id: i + 1,
        ...country,
      }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  openEditModal(category: any, content: any) {
    this.selectedCategoryId = category.id;
    this.formCategory.patchValue({
      name: category.name,
      description: category.description,
    });
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
  }

  openDeleteModal(id: any, content: any) {
    this.selectedCategoryId = id;
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.resetFormCategory();
  }

  resetFormCategory() {
    this.formCategory.reset();
  }
}
