import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeminarComponent } from './seminar.component';

const routes: Routes = [{ path: '', component: SeminarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeminarRoutingModule { }
