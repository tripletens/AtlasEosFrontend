import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'

@Component({
  selector: 'app-dealer-navbar',
  templateUrl: './dealer-navbar.component.html',
  styleUrls: ['./dealer-navbar.component.scss'],
})
export class DealerNavbarComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef
  toggle = true
  unreadMsgCount = 0
  dealerData: any
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private getData: HttpRequestsService,
  ) {}

  ngOnInit(): void {
    this.dealerData = this.tokenStorage.getUser()
    this.getUnreadMsg()

    setInterval(() => {
      this.getUnreadMsg()
    }, 10000)
  }

  getUnreadMsg() {
    this.getData
      .httpGetRequest('/chat/count-unread-msg/' + this.dealerData.id)
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
  toggleSideNav() {
    this.toggle = !this.toggle
  }
  logout() {
    // this.tokenStorage.signOut();
    return this.router.navigate(['/'])
  }
}
