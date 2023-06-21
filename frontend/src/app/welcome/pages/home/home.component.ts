import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  featuredProducts: Product[] = [];
  discountedProducts: Product[] = [];

  constructor(private router: Router, private productService: ProductsService) {
    // this.productService.getProducts().subscribe({
    //   next: (data) => {
    //     this.featuredProducts = data.filter((product: any) => product.featured);
    //     this.discountedProducts = data.filter(
    //       (product: any) => product.discount
    //     );
    //   },
    //   error: (errors) => {
    //     console.log(errors);
    //   },
    // });
  }

  ngOnInit() {}

  goToProductDetails(productId: number) {
    this.router.navigate(['/products', productId]);
  }
}
