import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealersRoutingModule } from './dealers-routing.module';
import { DealersComponent } from './dealers.component';


@NgModule({
  declarations: [
    DealersComponent
  ],
  imports: [
    CommonModule,
    DealersRoutingModule
  ]
})
export class DealersModule { }
