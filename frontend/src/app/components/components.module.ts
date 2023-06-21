import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderCardComponent } from '../components/order-card/order-card.component';

@NgModule({
  declarations: [OrderCardComponent],
  imports: [CommonModule],
  exports: [OrderCardComponent],
})
export class ComponentModule {}
