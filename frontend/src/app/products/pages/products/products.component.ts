import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductsService) {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (errors) => {
        console.log(errors);
      },
    });
    this.productService.listProducts().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  ngOnInit() {}

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
