import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
    children: [],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
