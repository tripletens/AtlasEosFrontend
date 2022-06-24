import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent implements OnInit {
  allCategoryData: any;
  noData = false;
  tableLoader = false;
  tableStatus = false;
  productData :any;
  @ViewChild('vendorId') vendor!: ElementRef;

  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService
  ) {
    this.getAllVendors();
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
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  getProductByVendorId() {
    let id = this.vendor.nativeElement.value;
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        if (result.status) {
          console.log('search vendor res', result.data);
          this.productData = result.data;
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
}
