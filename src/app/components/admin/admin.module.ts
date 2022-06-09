import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { AdminNavbarComponent } from '../templates/admin-navbar/admin-navbar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AddDealersComponent } from './add-dealers/add-dealers.component'
import { AddVendorsComponent } from './add-vendors/add-vendors.component'
import { AddBranchComponent } from './add-branch/add-branch.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendorOrderFormComponent } from './vendor-order-form/vendor-order-form.component';
import { PriceOverrideComponent } from './price-override/price-override.component';
import { DealerSummaryComponent } from './dealer-summary/dealer-summary.component';
import { MyMessagesComponent } from './my-messages/my-messages.component'

@NgModule({
  declarations: [
    AdminComponent,
    AdminNavbarComponent,
    DashboardComponent,
    AddDealersComponent,
    AddVendorsComponent,
    AddBranchComponent,
    VendorOrderFormComponent,
    PriceOverrideComponent,
    DealerSummaryComponent,
    MyMessagesComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AdminRoutingModule],
})
export class AdminModule {}
