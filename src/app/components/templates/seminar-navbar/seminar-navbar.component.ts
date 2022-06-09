import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'

import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-seminar-navbar',
  templateUrl: './seminar-navbar.component.html',
  styleUrls: ['./seminar-navbar.component.scss'],
})
export class SeminarNavbarComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const query = window.matchMedia('(max-width: 700px)')
    console.log(query)
  }

  closeOverLay() {
    const query = window.matchMedia('(max-width: 700px)')
    if (query.matches) {
      this.overlay.nativeElement.click()
    }
  }

  logout() {
    this.tokenStorage.signOut()
    return this.router.navigate(['/admin/login'])
  }
}
