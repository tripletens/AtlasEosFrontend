import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SalesRepGuard implements CanActivate {
  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) {}
  canActivate() {
    console.log('loggedout sales');
    if (this.tokenStorage.isLoggedInAsBranch() !== true) {
      window.localStorage.removeItem('branch');
      window.localStorage.removeItem('token');
      this.router.navigate(['/sales-rep']);
    }
    return true;
  }
}
