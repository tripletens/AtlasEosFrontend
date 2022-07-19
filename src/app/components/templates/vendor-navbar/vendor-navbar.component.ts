import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { Router } from '@angular/router'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.scss'],
})
export class VendorNavbarComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef
  vendorData: any
  adminData: any

  unreadMsgCount = 0
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
    private getData: HttpRequestsService,
  ) {}
  ngOnInit(): void {
    const query = window.matchMedia('(max-width: 700px)')
    console.log(query)
    this.vendorData = this.tokenStorage.getUser()

    this.getUnreadMsg()

    setInterval(() => {
      this.getUnreadMsg()
    }, 10000)
  }

  getUnreadMsg() {
    this.getData
      .httpGetRequest('/chat/count-unread-msg/' + this.vendorData.id)
      .then((result: any) => {
        if (result.status) {
          this.unreadMsgCount = result.data
        }
      })
      .catch((err) => {})
  }

  closeOverLay() {
    const query = window.matchMedia('(max-width: 700px)')
    if (query.matches) {
      this.overlay.nativeElement.click()
    }
  }

  logout() {
    this.tokenStorage.signOut()
    return this.router.navigate(['/'])
  }
}
