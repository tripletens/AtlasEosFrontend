import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HelpSectionComponent } from './help-section/help-section.component'
import { MessagesComponent } from './messages/messages.component'
import { PurchasesDealerComponent } from './purchases-dealer/purchases-dealer.component'
import { ReportProblemComponent } from './report-problem/report-problem.component'
import { SalesDetailedComponent } from './sales-detailed/sales-detailed.component'
import { SalesSummaryComponent } from './sales-summary/sales-summary.component'
import { SpecialOrdersComponent } from './special-orders/special-orders.component'
import { VendorOrderComponent } from './vendor-order/vendor-order.component'
import { VendorsComponent } from './vendors.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: VendorsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'vendor-order-form',
        component: VendorOrderComponent,
      },
      {
        path: 'purchases-by-dealer',
        component: PurchasesDealerComponent,
      },
      {
        path: 'sales-summary',
        component: SalesSummaryComponent,
      },
      {
        path: 'sales-detailed',
        component: SalesDetailedComponent,
      },
      {
        path: 'help',
        component: HelpSectionComponent,
      },
      {
        path: 'report-problem',
        component: ReportProblemComponent,
      },
      {
        path: 'special-orders',
        component: SpecialOrdersComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
