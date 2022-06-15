import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddAdminComponent } from './add-admin/add-admin.component'
import { AddDealersComponent } from './add-dealers/add-dealers.component'
import { AddVendorUsersComponent } from './add-vendor-users/add-vendor-users.component'
import { AddVendorsComponent } from './add-vendors/add-vendors.component'
import { AdminComponent } from './admin.component'
import { AllDealerUsersComponent } from './all-dealer-users/all-dealer-users.component'
import { AllProductsComponent } from './all-products/all-products.component'
import { AllVendorUsersComponent } from './all-vendor-users/all-vendor-users.component'
import { AllVendorsComponent } from './all-vendors/all-vendors.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DealerSummaryComponent } from './dealer-summary/dealer-summary.component'
import { EditDealerUsersComponent } from './edit-dealer-users/edit-dealer-users.component'
import { EditVendorUserComponent } from './edit-vendor-user/edit-vendor-user.component'
import { FaqComponent } from './faq/faq.component'
import { MyMessagesComponent } from './my-messages/my-messages.component'
import { PriceOverrideComponent } from './price-override/price-override.component'
import { ResolveProblemComponent } from './resolve-problem/resolve-problem.component'
import { RespondReportComponent } from './respond-report/respond-report.component'
import { VeiwReportComponent } from './veiw-report/veiw-report.component'
import { VendorOrderFormComponent } from './vendor-order-form/vendor-order-form.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'add-dealer',
        component: AddDealersComponent,
      },
      {
        path: 'vendor-order-form',
        component: VendorOrderFormComponent,
      },
      {
        path: 'price-override',
        component: PriceOverrideComponent,
      },
      {
        path: 'dealer-summary',
        component: DealerSummaryComponent,
      },
      {
        path: 'my-messages',
        component: MyMessagesComponent,
      },
      {
        path: 'resolve-problem',
        component: ResolveProblemComponent,
      },
      {
        path: 'view-report',
        component: VeiwReportComponent,
      },
      {
        path: 'respond-report',
        component: RespondReportComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'all-vendors',
        component: AllVendorsComponent,
      },
      {
        path: 'add-vendor',
        component: AddVendorsComponent,
      },
      {
        path: 'add-vendor-users',
        component: AddVendorUsersComponent,
      },
      {
        path: 'add-admin',
        component: AddAdminComponent,
      },
      {
        path: 'all-vendor-users',
        component: AllVendorUsersComponent,
      },
      {
        path: 'edit-vendor-user/:user',
        component: EditVendorUserComponent,
      },
      {
        path: 'edit-dealer-user/:user',
        component: EditDealerUsersComponent,
      },
      {
        path: 'all-dealer-users',
        component: AllDealerUsersComponent,
      },
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
