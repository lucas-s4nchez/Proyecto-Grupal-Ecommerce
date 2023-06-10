import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css'],
})
export class ProductDashboardComponent {
  isLoading: boolean = false;
  products: any = [];
  formData = new FormData();
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
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.productService.listProducts().subscribe({
      next: (data) => {
        this.isLoading = true;
        console.log(data);
        this.products = data;
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
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
    this.setFormData();
    this.productService.createProduct(this.formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
  resetFormProduct() {
    this.formProduct.reset();
  }
}
