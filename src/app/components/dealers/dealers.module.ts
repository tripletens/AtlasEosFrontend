import { NgModule } from '@angular/core'
import { CommonModule, CurrencyPipe } from '@angular/common'

import { DealersRoutingModule } from './dealers-routing.module'
import { DealersComponent } from './dealers.component'
import { QuickOrderComponent } from './quick-order/quick-order.component'
import { DealerNavbarComponent } from '../templates/dealer-navbar/dealer-navbar.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ShowOrdersComponent } from './show-orders/show-orders.component'
import { SpecialOrderComponent } from './special-order/special-order.component'
import { OrdersRemainingComponent } from './orders-remaining/orders-remaining.component'
import { EditOrderComponent } from './edit-order/edit-order.component'
import { OrderSummaryComponent } from './order-summary/order-summary.component'
import { PurchaseSummaryComponent } from './purchase-summary/purchase-summary.component'
import { FlyersComponent } from './flyers/flyers.component'
import { ProductSeminiarsComponent } from './product-seminiars/product-seminiars.component'
import { HelpComponent } from './help/help.component'
import { FormsModule } from '@angular/forms'
import { NgApexchartsModule } from 'ng-apexcharts'
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { NewOrdersComponent } from './new-orders/new-orders.component'
import { ReportProblemComponent } from './report-problem/report-problem.component'
import { AllSeminarsComponent } from './seminars/all-seminars/all-seminars.component'
import { MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { OngoingSeminarsComponent } from './seminars/ongoing-seminars/ongoing-seminars.component'
import { SheduledSeminarsComponent } from './seminars/sheduled-seminars/sheduled-seminars.component'
import { SafepipePipe } from 'src/app/core/pipes/safepipe.pipe'
import { BrowserModule } from '@angular/platform-browser'
import { MessagesComponent } from './messages/messages.component'

import { PromotionalFlyerComponent } from './promotional-flyer/promotional-flyer.component'
import { SearchComponent } from './search/search.component'
import { MatSortModule } from '@angular/material/sort';
import { SupportTicketsComponent } from './support-tickets/support-tickets.component';

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
    NewOrdersComponent,
    ReportProblemComponent,
    AllSeminarsComponent,
    OngoingSeminarsComponent,
    SheduledSeminarsComponent,
    SafepipePipe,
    PromotionalFlyerComponent,
    SearchComponent,
    MessagesComponent,
    SupportTicketsComponent,
  ],
  imports: [
    CommonModule,
    DealersRoutingModule,
    FormsModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,MatSortModule,
    PdfViewerModule,
  ],
})
export class DealersModule {}
