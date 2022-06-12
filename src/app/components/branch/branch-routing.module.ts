import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BranchComponent } from './branch.component'
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    component: BranchComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule {}
