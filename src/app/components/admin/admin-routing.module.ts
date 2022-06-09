import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddDealersComponent } from './add-dealers/add-dealers.component'
import { AdminComponent } from './admin.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DealerSummaryComponent } from './dealer-summary/dealer-summary.component'
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
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
