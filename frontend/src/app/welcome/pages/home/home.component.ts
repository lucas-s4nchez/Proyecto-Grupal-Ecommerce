import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredProducts: Product[] = [];
  discountedProducts: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.featuredProducts = this.productService.getFeaturedProducts();
    this.discountedProducts = this.productService.getDiscountedProducts();
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
