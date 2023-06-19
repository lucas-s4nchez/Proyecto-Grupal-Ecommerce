import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { SuccessComponent } from './pages/success/success.component';
import { FailureComponent } from './pages/failure/failure.component';
import { PendingComponent } from './pages/pending/pending.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/components.module';

@NgModule({
  declarations: [SuccessComponent, FailureComponent, PendingComponent],
  imports: [CommonModule, PaymentRoutingModule, SharedModule, ComponentModule],
})
export class PaymentModule {}
