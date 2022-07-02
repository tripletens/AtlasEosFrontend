import { Component, OnInit } from '@angular/core';

import { HttpRequestsService } from 'src/app/core/services/http-requests.service';

@Component({
  selector: 'app-promotional-flyer',
  templateUrl: './promotional-flyer.component.html',
  styleUrls: ['./promotional-flyer.component.scss'],
})
export class PromotionalFlyerComponent implements OnInit {
  promotionalLoader = true;
  promotionalData = false;
  promotionalStatus = false;
  promotionalAds: any;
  allCategoryData: any;
  constructor(private getData: HttpRequestsService) {
    this.getAllVendors();
    this.fetchFlyerAlt()
  }

  ngOnInit(): void {}

  getAllVendors() {
    this.getData
      .httpGetRequest('/promotional_fliers/vendors')
      .then((result: any) => {
        console.log(result);
        if (result.status) {
          this.allCategoryData = result.data;

        } else {
        }
      })
      .catch((err) => {});
  }
  fetchFlyer(data:any) {
    console.log(data.target.value);
    this.promotionalLoader = true;
    this.promotionalData = false;
    this.promotionalStatus = false;

    let id = data.target.value;
    console.log(id, 'id');
    this.getData
      .httpGetRequest('/show-promotional-flier-by-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        this.promotionalLoader = false;
        if (result.status) {
          // this.promotionalData = result.data.length > 0 ? true : false;
          // this.promotionalStatus = result.data.length <= 0 ? true : false;
          this.promotionalAds = result.data;
          this.promotionalData = true;
        } else {
        }
      })
      .catch((err) => {
        this.promotionalLoader = false;
        this.promotionalData = true;
      });
  }
   fetchFlyerAlt() {
    ///console.log(data.target.value);
    this.promotionalLoader = true;
    this.promotionalData = false;
    this.promotionalStatus = false;

    let id =1;
    console.log(id, 'id');
    this.getData
      .httpGetRequest('/show-promotional-flier-by-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        this.promotionalLoader = false;
        if (result.status) {
          // this.promotionalData = result.data.length > 0 ? true : false;
          // this.promotionalStatus = result.data.length <= 0 ? true : false;
          this.promotionalAds = result.data;
          this.promotionalData = true;
        } else {
        }
      })
      .catch((err) => {
        this.promotionalLoader = false;
        this.promotionalData = true;
      });
  }
}
