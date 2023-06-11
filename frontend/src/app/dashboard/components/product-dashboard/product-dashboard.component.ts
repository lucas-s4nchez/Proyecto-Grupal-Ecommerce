import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css'],
})
export class ProductDashboardComponent {
  isLoading: boolean = false;
  isSubmitting: boolean = false;
  products: any = [];
  productList: any = [];
  categories: any = [];
  formData = new FormData();
  page = 1;
  pageSize = 3;
  collectionSize = this.products.length;
  formProduct = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    image: ['', [Validators.required]],
    price: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    category_product: ['', [Validators.required]],
  });
  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.getProducts();
    this.getCategories();
  }
  get formProductState() {
    return {
      name: this.formProduct.get('name') as FormControl,
      description: this.formProduct.get('description') as FormControl,
      image: this.formProduct.get('image') as FormControl,
      price: this.formProduct.get('price') as FormControl,
      stock: this.formProduct.get('stock') as FormControl,
      category_product: this.formProduct.get('category_product') as FormControl,
    };
  }
  getProducts() {
    this.isLoading = true;
    this.productService.listProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.collectionSize = this.products.length;
        this.refreshProductList();
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  refreshProductList() {
    this.productList = this.products
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

  closeModal() {
    this.modalService.dismissAll();
    this.resetFormProduct();
  }

  setFormData() {
    this.formData.append('name', this.formProductState.name.value);
    this.formData.append(
      'description',
      this.formProductState.description.value
    );
    this.formData.append('price', this.formProductState.price.value);
    this.formData.append('stock', this.formProductState.stock.value);
    this.formData.append(
      'category_product',
      this.formProductState.category_product.value
    );
  }

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formData.append('image', file);
    }
  }

  addNewProduct() {
    this.isSubmitting = true;
    this.setFormData();
    this.productService.createProduct(this.formData).subscribe({
      next: (data) => {
        this.closeModal();
        this.isSubmitting = false;
        this.toastr.success(data.mensaje);
        this.getProducts();
      },
      error: (errors) => {
        console.log(errors);
        this.isSubmitting = false;
      },
      complete: () => {},
    });
  }

  resetFormProduct() {
    this.formProduct.reset();
  }
}
