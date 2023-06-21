import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/components.module';

@NgModule({
  declarations: [MyAccountComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule, ComponentModule],
})
export class AccountModule {}
