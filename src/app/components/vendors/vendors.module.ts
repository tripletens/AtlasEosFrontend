import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { VendorsRoutingModule } from './vendors-routing.module'
import { VendorsComponent } from './vendors.component'
import { VendorNavbarComponent } from '../templates/vendor-navbar/vendor-navbar.component'

@NgModule({
  declarations: [VendorsComponent, VendorNavbarComponent],
  imports: [CommonModule, VendorsRoutingModule],
})
export class VendorsModule {}
