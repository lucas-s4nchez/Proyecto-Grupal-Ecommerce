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
  isDeleting: boolean = false;
  selectedProductId: number | null = null;
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

  openEditModal(product: any, content: any) {
    product.image = '';
    this.selectedProductId = product.id;
    this.formProduct.patchValue(product);
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
  }

  openDeleteModal(id: any, content: any) {
    this.selectedProductId = id;
    this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
    });
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

  updateProduct() {
    this.isSubmitting = true;
    this.setFormData();
    const productId = this.selectedProductId;
    this.productService.updateProduct(productId, this.formData).subscribe({
      next: (data) => {
        this.closeModal();
        this.isSubmitting = false;
        this.toastr.success('Producto actualizado correctamente');
        this.getProducts();
      },
      error: (errors) => {
        this.isSubmitting = false;
        console.log(errors);
      },
    });
  }

  deleteProduct() {
    this.isDeleting = true;
    this.productService.deleteProduct(this.selectedProductId).subscribe({
      next: (data) => {
        this.isDeleting = false;
        this.closeModal();
        this.toastr.success('Producto eliminado');
        this.getProducts();
      },
      error: (errors) => {
        this.isDeleting = false;
        console.log(errors);
      },
    });
  }

  resetFormProduct() {
    this.formProduct.reset();
  }
}
