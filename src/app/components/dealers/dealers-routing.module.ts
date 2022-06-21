import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/core/guard/auth-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DealersComponent } from './dealers.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { FlyersComponent } from './flyers/flyers.component';
import { HelpComponent } from './help/help.component';
import { NewOrdersComponent } from './new-orders/new-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersRemainingComponent } from './orders-remaining/orders-remaining.component';
import { ProductSeminiarsComponent } from './product-seminiars/product-seminiars.component';
import { QuickOrderComponent } from './quick-order/quick-order.component';
import { ReportProblemComponent } from './report-problem/report-problem.component';
import { AllSeminarsComponent } from './seminars/all-seminars/all-seminars.component';
import { OngoingSeminarsComponent } from './seminars/ongoing-seminars/ongoing-seminars.component';
import { SheduledSeminarsComponent } from './seminars/sheduled-seminars/sheduled-seminars.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { SpecialOrderComponent } from './special-order/special-order.component';

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
        path: '',
        component: DashboardComponent,
      },
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
        path: 'new-product',
        component: NewOrdersComponent,
      },
      {
        path: 'edit-order',
        component: EditOrderComponent,
      },
      {
        path: 'report-problem',
        component: ReportProblemComponent,
      },
      {
        path: 'all-seminars',
        component: AllSeminarsComponent,
      },
      {
        path: 'ongoing-seminars',
        component: OngoingSeminarsComponent,
      },
      {
        path: 'sheduled-seminars',
        component: SheduledSeminarsComponent,
      },
      {
        path: 'report-problem',
        component: ReportProblemComponent,
      },
    ],
    canActivate: [AuthGuardGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealersRoutingModule { }
