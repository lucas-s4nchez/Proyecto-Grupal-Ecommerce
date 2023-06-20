import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './pages/success/success.component';
import { PendingComponent } from './pages/pending/pending.component';
import { FailureComponent } from './pages/failure/failure.component';

const routes: Routes = [
  { path: '', redirectTo: 'pending', pathMatch: 'full' },
  { path: 'success', component: SuccessComponent },
  { path: 'pending', component: PendingComponent },
  { path: 'failure', component: FailureComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}
