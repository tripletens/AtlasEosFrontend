import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dealer-navbar',
  templateUrl: './dealer-navbar.component.html',
  styleUrls: ['./dealer-navbar.component.scss'],
})
export class DealerNavbarComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef;
  toggle = true;
  constructor(private router: Router) {}

  ngOnInit(): void { }
  closeOverLay() {
    const query = window.matchMedia('(max-width: 700px)');
    if (query.matches) {
      this.overlay.nativeElement.click();
    }
  }
  toggleSideNav() {
    this.toggle = !this.toggle;
  }
  logout() {
    // this.tokenStorage.signOut();
    return this.router.navigate(['/']);
  }
}
