import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeminarRoutingModule } from './seminar-routing.module';
import { SeminarComponent } from './seminar.component';


@NgModule({
  declarations: [
    SeminarComponent
  ],
  imports: [
    CommonModule,
    SeminarRoutingModule
  ]
})
export class SeminarModule { }
