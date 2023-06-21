import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  isLoading = false;
  products: any = [];
  isAuthenticated = false;
  isAdmin = false;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private authService: AuthService
  ) {
    this.isAuthenticated = authService.isAuthenticated;
    this.isAdmin = authService.isAdmin;
    this.getProducts();
  }

  ngOnInit() {}
  getProducts() {
    this.isLoading = true;
    this.productService.listProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (errors) => {
        console.log(errors);
        this.isLoading = false;
      },
    });
  }
  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
  goToDashboard() {
    this.router.navigate(['/admin']);
  }
}
