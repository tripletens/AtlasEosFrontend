import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { TokenStorageService } from './token-storage.service'
import { Router, NavigationEnd } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class OrderCheckService {
  hasOrdered = false
  dealerOrder: any
  closeProgramStatus = false

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private token: TokenStorageService,
  ) {}

  closeProgram() {
    let status = this.token.getUser().close_program

    switch (status) {
      case 0:
        this.closeProgramStatus = false
        console.log(this.closeProgramStatus, 'hasordered')
        break
      case 1:
        this.closeProgramStatus = true
        //console.log(this.hasOrdered, 'hasordered');
        break
      default:
        return
    }
  }

  orderChecker() {
    let order = this.token.getUser().order_status
    console.log('i ran', order)

    switch (order) {
      case 0:
        this.hasOrdered = false

        console.log(this.hasOrdered, 'hasordered')
        break
      case 1:
        this.hasOrdered = true
        console.log(this.hasOrdered, 'hasordered')
        break
      default:
        return
    }
  }
  orderError() {
    if (this.hasOrdered) {
      this.toastr.error(
        'You have completed your order for Booking Order Program',
        `Order Completed`,
      )
    }
  }
}
