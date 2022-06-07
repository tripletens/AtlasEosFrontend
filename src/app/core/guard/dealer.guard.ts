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
export class DealerGuard implements CanActivate {
  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) {}

  canActivate() {
        console.log('loggedouted');

    if (this.tokenStorage.isLoggedInAsDealer() !== true) {
      window.localStorage.removeItem('dealer');
      window.localStorage.removeItem('token');
      this.router.navigate(['/']);
    }
    return true;
  }
}
