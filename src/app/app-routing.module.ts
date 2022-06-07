import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dealers',
    loadChildren: () =>
      import('./components/dealers/dealers.module').then(
        (m) => m.DealersModule,
      ),
  },
  {
    path: 'vendors',
    loadChildren: () =>
      import('./components/vendors/vendors.module').then(
        (m) => m.VendorsModule,
      ),
  },
  {
    path: 'branch',
    loadChildren: () =>
      import('./components/branch/branch.module').then((m) => m.BranchModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
