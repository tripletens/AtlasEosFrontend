import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

export interface PeriodicElement {
  qty: any;

  atlas_id: any;
  vendor: string;
  description: string;
  booking: number;
  special: number;
  extended: number;
}

@Component({
  selector: 'app-quick-order',
  templateUrl: './quick-order.component.html',
  styleUrls: ['./quick-order.component.scss'],
})
export class QuickOrderComponent implements OnInit {
  searchId = '';
  searchLoader = true;
  searchStatus = false;
  noData = false;
  allCategoryData: any;
  searchResultData: any;
  disabled = true;
  disabledBtn = true;
  addLoader = false;
  addSuccess = false;
  @ViewChild('vendorInput') vendorInput!: ElementRef;
  @ViewChild('qtyInput') qtyInput!: ElementRef;
  @ViewChild('searchid') atlasInput!: ElementRef;

  orderTable: object[] = [];
  cartHistory: object[] = [];
  orderLen = 0;
  tableData: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'qty',
    'atlas_id',
    'vendor',
    'description',
    'booking',
    'special',
    'extended',
  ];
  sortTable: any;
  dataSrc = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  canOrder = false;
  isMod = false;
  cartLoader = false;
  orderSuccess = false;

  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private token: TokenStorageService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    // this.searchResultData.vendor_name = '';
    this.fetchProductById();
    this.getCart();
    this.fetchQuickOrderCart();
  }
  @ViewChild(MatSort)
  sort!: MatSort;
  ngOnInit(): void {}
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  parser(data: any) {
    return JSON.parse(data);
  }
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
    this.noData = false;
    this.disabled = true;

    console.log('search id', atlasId);
    if (atlasId !== '') {
      this.searchStatus = false;
      this.searchLoader = true;
      this.getData
        .httpGetRequest('/quick-order-filter-atlasid/' + atlasId)
        .then((res: any) => {
          if (res.status) {
            this.searchStatus = true;
            this.searchLoader = false;
            this.searchResultData = res.data;
            this.noData = false;
            this.disabled = false;
            console.log('search result', this.searchResultData);
          } else {
            this.searchStatus = false;
            this.searchLoader = false;
            this.noData = true;
            this.disabled = true;

            // this.toastr.info(`Cannot find product/vendor`, 'Search error');
          }
        })
        .catch((err: any) => {
          this.searchStatus = false;
          this.searchLoader = false;
          this.noData = true;
          this.disabled = true;
          console.log(err);
          this.toastr.error('Something went wrong, try again', ' Error');
        });
    } else {
    }
  }
  qtyInputCheck(qty: any) {
    if (qty > 0) {
      this.disabledBtn = false;
      this.runCalc(this.searchResultData, qty, true);
    } else {
      this.disabledBtn = true;
    }
  }
  runCalc(product: any, qty: any, bool: boolean) {
    let price = parseFloat(product?.booking!);
    let posssibleBreak = false;
    let specData;
    let total = 0.0;
    let arrHist: any = this.cartHistory;
    let cart = this.orderTable;
    let inCart = true;
    let priceSummary = {
      specItem: false,
      assortItem: false,
      specCond: 0,
      specPrice: 0,
    };
    let grp: any;
    // for (var y = 0; y < arrHist.length; y++) {
    //   console.log(
    //     'Product id check',
    //     arrHist[y]?.id,
    //     product.id,
    //     arrHist[y]?.id == product.id
    //   );
    //   if (arrHist[y]?.id == product.id) {
    //     inCart = true;
    //   } else {
    //     inCart = false;
    //   }
    // }console.log(
    //   'what is the val of incart',
    //   inCart,
    //   arrHist,
    //   product.id
    // );
    if (inCart) {
      console.log('grping', grp);
      if (product.grouping == null || undefined) {
        grp = '';
        console.log('grping', grp);
      } else {
        grp = product.grouping;
        console.log('grping else', grp);
      }
      let usedVar = {
        vendor_id: product.vendor,
        atlas_id: product.atlas_id,
        qty: qty,
        price: '0',
        unit_price: price.toString(),
        product_id: product.id.toString(),
        groupings: grp,
      };

      if (product.spec_data) {
        specData = JSON.parse(product.spec_data);
        posssibleBreak = true;
        for (var x = 0; x < specData?.length; x++) {
          let lev = specData[x];
          if (lev.type == 'special') {
            priceSummary.specItem = true;
            priceSummary.specCond = lev.cond;
            priceSummary.specPrice = lev.special;
          }
          if (lev.type == 'assorted') {
            priceSummary.assortItem = true;
            priceSummary.specCond = lev.cond;
            priceSummary.specPrice = lev.special;
          }
        }
      }
      function checkGrouping(arr: any) {}
      function replaceOldVal(arr: any) {
        if (arr?.length > 0) {
          for (var j = 0; j < arr?.length; j++) {
            let Obj: any = arr[j]!;
            if (Obj?.atlas_id == product.atlas_id) {
              arr.splice(j, 1);
            }
          }
        }
      }

      function calcTotal() {
        if (qty > 0) {
          if (posssibleBreak) {
            if (priceSummary.specItem) {
              console.log('step 3');
              if (qty >= priceSummary.specCond) {
                total = qty * priceSummary.specPrice;
                usedVar.unit_price = priceSummary.specPrice.toString();

                console.log('step 3', total);
              } else {
                console.log('second else', total);
                total = qty * price;
                console.log('below second else', total);
              }
            }
            if (priceSummary.assortItem) {
              console.log('step 3 assort');
              let mutArr = arrHist.concat(cart);
              for (var j = 0; j < mutArr?.length; j++) {
                let Obj: any = mutArr[j]!;
                if (product?.grouping) {
                  if (Obj.grouping == grp) {
                    qty = qty + Obj.qty;
                  }
                }
              }
              if (qty >= priceSummary.specCond) {
                total = qty * priceSummary.specPrice;
                usedVar.unit_price = priceSummary.specPrice.toString();
                console.log('step 3 assort', total);
              } else {
                console.log('second else assort', total);
                total = qty * price;
                console.log('below second else assort', total);
              }
            }
          } else {
            console.log('first else', total);
            total = qty * price;
            console.log('below first else', total);
          }
        }
        total = parseFloat(total.toFixed(2));
        usedVar.price = total.toString();
      }

      calcTotal();

      replaceOldVal(this.orderTable);
      console.log('userobj', usedVar, 'table', this.orderTable);
      this.orderTable.push(usedVar);
      if (bool) {
        this.addToQuickOrder();
      }
      console.log(
        'total val',
        total,
        price,
        qty,
        posssibleBreak,
        'price sum',
        priceSummary,
        'var added',
        usedVar,
        'table',
        this.orderTable
      );
    } else {
      this.toastr.info(``, 'This item has been added to cart already');
    }
  }
  fetchQuickOrderCart() {
    this.canOrder = false;
    this.isMod = false;
    let id = this.token.getUser()?.id;
    this.getData
      .httpGetRequest('/fetch-quick-order-items-user-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        if (result.status) {
          console.log('search vendor res', result.data);
          this.tableData = result.data;
          if (result.data.length !== 0) {
            this.canOrder = true;
          }
          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data);
          this.dataSrc.sort = this.sort;
          this.dataSrc.paginator = this.paginator;
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  addToQuickOrder() {
    this.addLoader = true;
    this.addSuccess = false;

    let uid = this.token.getUser().id.toString();
    let accntId = this.token.getUser().account_id;
    this.orderLen = this.orderTable.length;
    if (this.orderTable.length > 0) {
      let formdata = {
        uid: uid,
        dealer: accntId,
        product_array: JSON.stringify(this.orderTable),
      };
      this.getData
        .httpPostRequest('/add-item-to-cart', formdata)
        .then((result: any) => {
          if (result.status) {
            this.addLoader = false;
            this.addSuccess = true;
            this.toastr.success(
              `${this.orderLen}  item(s) have been added to cart`,
              'Success'
            );
            this.orderTable = [];
            this.atlasInput.nativeElement.value = null;
            this.vendorInput.nativeElement.value = null;
            this.qtyInput.nativeElement.value = null;
            this.searchStatus = false;
            this.fetchQuickOrderCart();
          } else {
            this.addLoader = false;

            this.toastr.info(`Something went wrong`, 'Error');
          }
        })
        .catch((err) => {
          this.addLoader = false;
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(
              `Please logout and login again`,
              'Session Expired'
            );
          } else {
            this.toastr.info(`Something went wrong`, 'Error');
          }
        });
    } else {
      this.addLoader = false;

      this.toastr.info(`No item quantity has been set`, 'Error');
    }
  }
  getCart() {
    let id = this.token.getUser().account_id;
    this.getData
      .httpGetRequest('/cart/dealer/' + id)
      .then((result: any) => {
        if (result.status) {
          console.log('dealer id', result?.data);
          this.cartHistory = result?.data;
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  submitOrder() {}
}
