import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealersRoutingModule } from './dealers-routing.module';
import { DealersComponent } from './dealers.component';
import { QuickOrderComponent } from './quick-order/quick-order.component';
import { DealerNavbarComponent } from '../templates/dealer-navbar/dealer-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { SpecialOrderComponent } from './special-order/special-order.component';
import { OrdersRemainingComponent } from './orders-remaining/orders-remaining.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component';
import { FlyersComponent } from './flyers/flyers.component';
import { ProductSeminiarsComponent } from './product-seminiars/product-seminiars.component';
import { HelpComponent } from './help/help.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  declarations: [
    DealersComponent,
    QuickOrderComponent,
    DealerNavbarComponent,
    DashboardComponent,
    ShowOrdersComponent,
    SpecialOrderComponent,
    OrdersRemainingComponent,
    EditOrderComponent,
    OrderSummaryComponent,
    PurchaseSummaryComponent,
    FlyersComponent,
    ProductSeminiarsComponent,
    HelpComponent,
    MessagesComponent,
  ],
  imports: [
    CommonModule,
    DealersRoutingModule,
    FormsModule,
    NgApexchartsModule,
    PdfViewerModule,
  ],
})
export class DealersModule {}
