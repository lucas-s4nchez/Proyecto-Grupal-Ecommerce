import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: number = 0;
  product: Product | null = null;
  productNotFound: String | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
    });
    this.productService.getProductById(this.productId).subscribe({
      next: (data: Product) => {
        this.product = data;
      },
      error: (errors) => {
        console.error(errors.message);
        if (errors.status === 404) {
          this.productNotFound = 'El producto que buscas no existe.';
        }
      },
    });
  }
  ngOnInit(): void {}

  addProductToCart(productId: any, quantity: any) {
    this.cartService.addProductToCart(productId, quantity).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
