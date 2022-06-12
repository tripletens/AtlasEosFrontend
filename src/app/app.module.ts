import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { ToastrModule } from 'ngx-toastr'
import { HttpClientModule } from '@angular/common/http'
import { AdminNavbarComponent } from './components/templates/admin-navbar/admin-navbar.component'
import { SeminarNavbarComponent } from './components/templates/seminar-navbar/seminar-navbar.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DealerNavbarComponent } from './components/templates/dealer-navbar/dealer-navbar.component'
import { AdminLoginComponent } from './components/admin-login/admin-login.component'
import {
  authInterceptorProviders,
  JwtAuthInterceptor,
} from './core/services/jwt-auth.interceptor'

@NgModule({
  declarations: [AppComponent, LoginComponent, AdminLoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    ToastrModule.forRoot({
      timeOut: 3000,
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
