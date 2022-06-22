import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BranchNavbarComponent } from '../templates/branch-navbar/branch-navbar.component'

import { BranchRoutingModule } from './branch-routing.module'
import { BranchComponent } from './branch.component'
import { DashboardComponent } from './dashboard/dashboard.component'

@NgModule({
  declarations: [BranchComponent, DashboardComponent, BranchNavbarComponent],
  imports: [CommonModule, BranchRoutingModule],
})
export class BranchModule {}
