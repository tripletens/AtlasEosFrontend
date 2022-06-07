import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderCheckService } from '../services/order-check.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDeactivateGuard implements CanDeactivate<unknown> {
  constructor(ordercheckservice:OrderCheckService) {}

  canDeactivate(): Observable<boolean> | boolean {
    // if (this.ordercheckservice.) {
    //   return Observable.of(result);
    // }
    return true;
  }
}
