import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SeminarRoutingModule } from './seminar-routing.module'
import { SeminarComponent } from './seminar.component'
import { SeminarNavbarComponent } from '../templates/seminar-navbar/seminar-navbar.component'
import { OverviewComponent } from './overview/overview.component'
import { AllSeminarsComponent } from './all-seminars/all-seminars.component'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    SeminarComponent,
    SeminarNavbarComponent,
    OverviewComponent,
    AllSeminarsComponent,
  ],
  imports: [CommonModule, MatTableModule, SeminarRoutingModule],
})
export class SeminarModule {}
