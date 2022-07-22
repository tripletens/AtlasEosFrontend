import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
interface Dealer {
  fname: string;
  lname: string;
  id: any;
}
declare var $: any;
@Component({
  selector: 'app-special-order',
  templateUrl: './special-order.component.html',
  styleUrls: ['./special-order.component.scss'],
})
export class SpecialOrderComponent implements OnInit {
  allCategoryData: any;
  vendorSelected = false;
  arr: any = [];
  z = {
    quantity: '',
    description: '',
    vendor_Id: '',
  };
  ordained: any;
  dealer: Dealer = {
    fname: '',
    lname: '',
    id: undefined,
  };
  editable: any;
  editOrderPage = false;
  specialProduct: any = [];
  editOrderSuccess = false;
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService,
    private currencyPipe: CurrencyPipe
  ) {
    this.getAllVendors();
  }

  ngOnInit(): void {}
  getAllVendors() {
    this.getData
      .httpGetRequest('/dealer/get-vendors')
      .then((result: any) => {
        // console.log(result);
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
  selectVendor(id: any) {
    if (id !== 'none') {
      this.ordained = this.allCategoryData[id];
      this.vendorSelected = true;
      this.dealer.fname = this.token.getUser().first_name;
      this.dealer.lname = this.token.getUser().last_name;
      this.dealer.id = this.token.getUser().id;
      console.log('dealer data', this.ordained, this.allCategoryData);
      this.clearOrder();
    }
  }
  addRow() {
    this.arr.push(this.z);
    console.log('array result', this.arr);
  }
  goToEditOrder(prod: any) {
    this.editOrderPage = true;
    this.editable = prod;
    this.editOrderSuccess = false;
  }
  enterValue(type: any, value: any, i: any) {
    console.log('array enter value', value);
    if (type == 'qty') {
      this.arr[i].quantity = value;
    }
    if (type == 'vId') {
      this.arr[i].vendor_Id = value;
    }
    if (type == 'desc') {
      this.arr[i].description = value;
    }
    console.log('array result enterval', this.arr, i, this.arr[i]);
  }
  saveValue(i: any) {
    let qty = $('#qty-input-' + i).val();
    let vId = $('#vendor-input-' + i).val();
    let desc = $('#desc-input-' + i).val();

    let q = {
      quantity: qty,
      vendor_Id: vId,
      description: desc,
    };
    this.arr[i] = q;

    console.log('array result enterval', this.arr, i, q, this.arr[i]);
  }
  parser(data: any) {
    return JSON.parse(data);
  }
  submitSpecialOrder(qty: any, vId: any, desc: any) {
    let arr: any;
    let q = {
      quantity: qty,
      vendor_Id: vId,
      description: desc,
    };
    arr.push(q);

    let formdata = {
      uid: this.token.getUser().id,
      product_array: this.parser(arr),
    };
    this.getData
      .httpGetRequest('/special-orders/edit', formdata)
      .then((result: any) => {
        // console.log(result);
        if (result.status) {
          this.editOrderSuccess = true;
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  deleteOrder(i: any) {
    let newtable = [];

    for (var j = 0; j < this.arr.length; j++) {
      console.log('dele log', i, j);
      if (i !== j) {
        console.log('dele log', i, j);
        newtable.push(this.arr[j]);
      }
    }
    this.arr = newtable;
  }
  navigateFromEdit() {
    this.editOrderPage = false;
    this.editOrderSuccess = false;
  }
  clearOrder() {
    this.arr = [];
  }
}
