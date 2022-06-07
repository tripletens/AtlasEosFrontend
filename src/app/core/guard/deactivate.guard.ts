import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ComponentCanDeactivate } from '../model/can-deactivate';

@Injectable({
  providedIn: 'root',
})
export class DeactivateGuard implements CanDeactivate<ComponentCanDeactivate> {
  component: any;
 async confirmBox() {
  return await Swal.fire({
    title: 'You are about to leave this page',
    text: 'Any items not added to your cart will be lost',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ok',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.value) {
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      return false;
    } else {
      return false;
    }
  });
  }
  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.canDeactivate()) {
      return true;
    } else {
      return this.confirmBox();
    }
  }
}
