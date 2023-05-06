import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: number = 0;
  product!: Product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
    });
    this.product = this.productService.getProductById(this.productId)!;
    if (!this.product) {
      // Si no existe un producto con el ID especificado, redirigir a una página de error
      this.router.navigateByUrl('/not-found');
    }
  }
}
