import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BranchNavbarComponent } from '../templates/branch-navbar/branch-navbar.component'

import { BranchRoutingModule } from './branch-routing.module'
import { BranchComponent } from './branch.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DealerSummaryComponent } from './dealer-summary/dealer-summary.component'
import { MyMessagesComponent } from './my-messages/my-messages.component'
import { DetailedSummaryComponent } from './detailed-summary/detailed-summary.component'

import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    BranchComponent,
    DashboardComponent,
    BranchNavbarComponent,
    DealerSummaryComponent,
    MyMessagesComponent,
    DetailedSummaryComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    BranchRoutingModule,
  ],
})
export class BranchModule {}
