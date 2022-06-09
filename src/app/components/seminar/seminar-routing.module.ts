import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AllSeminarsComponent } from './all-seminars/all-seminars.component'
import { OverviewComponent } from './overview/overview.component'
import { SeminarComponent } from './seminar.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },

  {
    path: '',
    component: SeminarComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'all-seminars',
        component: AllSeminarsComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeminarRoutingModule {}
