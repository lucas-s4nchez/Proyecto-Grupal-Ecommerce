import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/Products';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  isLoading = false;
  productId: number = 0;
  product: any = null;
  productNotFound: String | null = null;
  isAuthenticated = false;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductsService,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['id'];
    });
    this.isAuthenticated = authService.isAuthenticated;
    this.isAdmin = authService.isAdmin;
    this.getProductById(this.productId);
  }
  ngOnInit(): void {}

  getProductById(productId: any) {
    this.isLoading = true;
    this.productService.getProductById(productId).subscribe({
      next: (data: Product) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (errors) => {
        if (errors.status === 404) {
          this.productNotFound = 'El producto que buscas no existe.';
        }
        this.isLoading = false;
      },
    });
  }

  addProductToCart(productId: any, quantity: any) {
    this.cartService.addProductToCart(productId, quantity).subscribe({
      next: (data) => {
        this.toastr.success(`${this.product.name} agregado al carrito`);
      },
      error: (errors) => {
        console.log(errors);
      },
    });
  }
}
