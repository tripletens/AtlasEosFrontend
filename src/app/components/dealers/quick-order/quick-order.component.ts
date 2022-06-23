import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit {
  searchId = '';
  searchLoader = true;
  searchStatus = false;

  allCategoryData: any;
  searchResultData: any;

  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private token: TokenStorageService
  ) {
    // this.searchResultData.vendor_name = '';
    this.fetchProductById();
  }

  ngOnInit(): void {}
  getAllVendors() {
    this.getData
      .httpGetRequest('/get-all-vendors')
      .then((result: any) => {
        console.log(result);
        if (result.status) {
          this.allCategoryData = result.data;
        } else {
        }
      })
      .catch((err) => {});
  }
  fetchProductById() {
    let atlasId = this.searchId;

    console.log('search id', atlasId);
    if (atlasId !== '') {
      this.searchStatus = false;
      this.searchLoader = true;
      this.getData
        .httpGetRequest('/quick-order-filter-atlasid/' + atlasId)
        .then((res: any) => {
          
          if (res.status) {this.searchStatus = true;
          this.searchLoader = false;
            this.searchResultData = res.data;
            console.log('search result', this.searchResultData);
          } else {this.searchStatus = false;
          this.searchLoader = false;
            this.toastr.info(`Cannot find product/vendor`, 'Search error');
          }
        })
        .catch((err: any) => {
          this.searchStatus = false;
          this.searchLoader = false;
          console.log(err);
          this.toastr.error('Something went wrong, try again', ' Error');
        });
    } else {
    }
  }
}
