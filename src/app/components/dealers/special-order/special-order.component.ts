import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
interface Dealer {
  fname: string;
  lname: string;
  id: any;
}
class Product {
  public quantity: number | undefined;
  description: string | undefined;
  vendor_id: string | undefined;
}
declare var $: any;
export interface PeriodicElement {
  no: number;
  qty: string;
  description: string;
  vendor_name: string;
  vendor_code: string;
}

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
    vendor_id: '',
  };
  ordained: any;
  dealer: Dealer = {
    fname: '',
    lname: '',
    id: undefined,
  };
  tableData: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'id',
    'qty',
    'description',
    'vendor_code',
    'vendor_name',

    'action',
  ];
  noData = false;
  editable: any;
  editOrderPage = false;
  editOrderSuccess = false;
  saveLoader = false;
  tableId = {};
  disableSubmit = false;
  errorPrmpt = false;
  allOrderPage = false;
  dataSrc = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
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
    this.fetchOrder();
  }
  @ViewChild(MatSort)
  sort!: MatSort;
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
    this.arr.push(new Product());
    console.log('array result', this.arr);
  }
  goToEditOrder(prod: any, i: number) {
    this.editOrderPage = true;
    this.editable = prod;
    this.editOrderSuccess = false;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  goToAllOrder() {
    this.editOrderPage = false;
    this.allOrderPage = true;
    this.vendorSelected = false;
  }
  enterValue(type: any, value: any, i: any) {
    console.log('array enter value', value);
    if (type == 'qty') {
      this.arr[i].quantity = value;
    }
    if (type == 'vId') {
      this.arr[i].vendor_id = value;
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
      vendor_id: vId,
      description: desc,
    };
    this.arr[i] = q;

    console.log('array result enterval', this.arr, i, q, this.arr[i]);
  }
  parser(data: any) {
    return JSON.parse(data);
  }
  submitEditSpecialOrder(qty: any, vId: any, desc: any) {
    let array: any;
    let q = {
      quantity: qty,
      vendor_id: vId,
      description: desc,
    };
    array.push(q);

    let formdata = {
      uid: this.token.getUser().id,
      product_array: this.parser(array),
    };
    this.getData
      .httpPostRequest('/special-orders/edit', formdata)
      .then((result: any) => {
        // console.log(result);
        if (result.status) {
          this.editOrderSuccess = true;
          this.fetchOrder();
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  submitOrder() {
    this.checkEmptyStat();
    console.log('submitted arr', this.arr, JSON.stringify(this.arr));
    if (!this.disableSubmit) {
      this.saveLoader = true;
      let formdata = {
        uid: this.token.getUser().id,
        product_array: JSON.stringify(this.arr),
      };
      this.errorPrmpt = false;
      this.getData
        .httpPostRequest('/special-orders/add', formdata)
        .then((result: any) => {
          // console.log(result);
          if (result.status) {
            this.saveLoader = false;
            this.toastr.success(`Order saved`, 'Success');
            this.arr = [];
          } else {
            this.saveLoader = false;

            this.toastr.info(
              `Something went wrong could not save orders`,
              'Error'
            );
          }
        })
        .catch((err) => {
          this.saveLoader = false;

          this.toastr.info(
            `Something went wrong could not save orders`,
            'Error'
          );
        });
    } else {
      this.errorPrmpt = true;
    }
  }
  fetchOrder() {
    let user = this.token.getUser().id;
    this.getData
      .httpGetRequest('/special-orders/' + user)
      .then((result: any) => {
        // console.log(result);
        if (result.status) {
          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data);
          this.dataSrc.paginator = this.paginator;
          this.dataSrc.sort = this.sort;
        } else {
          this.toastr.info(
            `Something went wrong fetching special orders`,
            'Error'
          );
          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data);
          this.dataSrc.paginator = this.paginator;
          this.dataSrc.sort = this.sort;
        }
      })
      .catch((err) => {
        this.saveLoader = false;

        this.toastr.info(
          `Something went wrong fetching special orders`,
          'Error'
        );
      });
  }
  checkEmptyStat() {
    if (this.arr.length < 1) {
      this.disableSubmit = true;
    } else {
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].quantity == '') {
          this.disableSubmit = true;
        }
        if (this.arr[i].vendor_id == '') {
          this.disableSubmit = true;
        }
        if (this.arr[i].description == '') {
          this.disableSubmit = true;
        }
      }
    }
  }
  deleteOrder(i: any) {
    if (i > -1) {
      this.arr.splice(i, 1);
    }
  }
  deleteSavedOrder(i: any) {
    this.getData
      .httpGetRequest('/special-orders/delete' + i)
      .then((result: any) => {
        // console.log(result);
        if (result.status) {
          this.fetchOrder();
        } else {
          this.toastr.info(
            `Something went wrong deleting special orders`,
            'Error'
          );
        }
      })
      .catch((err) => {
        this.saveLoader = false;

        this.toastr.info(
          `Something went wrong deleting special orders`,
          'Error'
        );
      });
  }
  navigateFromEdit() {
    this.editOrderPage = false;
    this.editOrderSuccess = false;
  }
  clearOrder() {
    this.arr = [];
  }
}
