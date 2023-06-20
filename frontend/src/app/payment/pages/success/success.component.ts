import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent {
  isLoading = false;
  orderId: any = null;
  order: any = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrdersService
  ) {}
  ngOnInit() {
    const externalReference =
      this.route.snapshot.queryParams['external_reference'];
    const orderId = this.extractOrderId(externalReference);
    this.orderId = orderId;
    this.getOrderById(this.orderId);
  }

  getOrderById(orderId: any) {
    this.isLoading = true;
    this.orderService.getOrderById(orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.isLoading = false;
      },
      error: (errors) => {
        this.isLoading = false;
        console.log(errors);
      },
    });
  }

  private extractOrderId(externalReference: string): string | null {
    const keyValuePairs = externalReference.split(','); // Divide la cadena en pares clave-valor
    for (const pair of keyValuePairs) {
      const [key, value] = pair.trim().split(':'); // Divide cada par en clave y valor
      if (key.trim() === 'order_id') {
        return value.trim(); // Devuelve el valor si la clave es 'order_id'
      }
    }
    return null; // Devuelve una cadena vacía si no se encuentra el valor de order_id
  }

  redirect() {
    this.router.navigateByUrl('/my-account');
  }
}
