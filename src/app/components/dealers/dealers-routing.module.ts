import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DealersComponent } from './dealers.component'
import { FlyersComponent } from './flyers/flyers.component'
import { HelpComponent } from './help/help.component'
import { MessagesComponent } from './messages/messages.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { OrdersRemainingComponent } from './orders-remaining/orders-remaining.component'
import { ProductSeminiarsComponent } from './product-seminiars/product-seminiars.component'
import { QuickOrderComponent } from './quick-order/quick-order.component'
import { ShowOrdersComponent } from './show-orders/show-orders.component'
import { SpecialOrderComponent } from './special-order/special-order.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: DealersComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'quick-order',
        component: QuickOrderComponent,
      },
      {
        path: 'flyer',
        component: FlyersComponent,
      },
      {
        path: 'help',
        component: HelpComponent,
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent,
      },
      {
        path: 'orders-remaining',
        component: OrdersRemainingComponent,
      },
      {
        path: 'product-seminars',
        component: ProductSeminiarsComponent,
      },
      {
        path: 'show-orders',
        component: ShowOrdersComponent,
      },
      {
        path: 'special-order',
        component: SpecialOrderComponent,
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
export class DealersRoutingModule {}
