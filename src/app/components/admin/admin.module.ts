import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { AdminComponent } from './admin.component'
import { AdminNavbarComponent } from '../templates/admin-navbar/admin-navbar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AddDealersComponent } from './add-dealers/add-dealers.component'
import { AddVendorsComponent } from './add-vendors/add-vendors.component'
import { AddBranchComponent } from './add-branch/add-branch.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { VendorOrderFormComponent } from './vendor-order-form/vendor-order-form.component'
import { PriceOverrideComponent } from './price-override/price-override.component'
import { DealerSummaryComponent } from './dealer-summary/dealer-summary.component'
import { MyMessagesComponent } from './my-messages/my-messages.component'
import { ResolveProblemComponent } from './resolve-problem/resolve-problem.component'
import { FaqComponent } from './faq/faq.component'
import { VeiwReportComponent } from './veiw-report/veiw-report.component'
import { RespondReportComponent } from './respond-report/respond-report.component'
import { AllVendorsComponent } from './all-vendors/all-vendors.component'
import { MatTableModule } from '@angular/material/table';
import { AddVendorUsersComponent } from './add-vendor-users/add-vendor-users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AllVendorUsersComponent } from './all-vendor-users/all-vendor-users.component'

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
    ResolveProblemComponent,
    FaqComponent,
    VeiwReportComponent,
    RespondReportComponent,
    AllVendorsComponent,
    AddVendorUsersComponent,
    AddAdminComponent,
    AllVendorUsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
