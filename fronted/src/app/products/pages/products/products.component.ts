import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
