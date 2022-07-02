import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-dealer-navbar',
  templateUrl: './dealer-navbar.component.html',
  styleUrls: ['./dealer-navbar.component.scss'],
})
export class DealerNavbarComponent implements OnInit {
  @ViewChild('overlay') overlay!: ElementRef;
  toggle = true;
  search = '';
  firstName!: string;
  lastName!: string;
  acct!: string;

  location!: string;
  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getData();
  }
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
  getData() {
    let data = this.tokenStorage.getUser();
    // console.log(data);
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.acct = data.id;
    this.location = data.location;
  }
  searchData() {
    console.log('hehheh');
    if (this.search != '') {
      this.router.navigate(['dealers/search/' + this.search]);
    }
  }
}
