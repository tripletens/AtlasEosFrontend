import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { MatSortModule } from '@angular/material/sort';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

export interface PeriodicElement {
  atlas_id: any;
  vendor: string;
  description: string;
  booking: number;
  special: number;
  extended: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    atlas_id: '',
    vendor: '',
    description: '',
    booking: 0,
    special: 0,
    extended: 0,
  },
];
declare var $: any;
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
  cartLoader = false;
  productData: any;
  @ViewChild('vendorId') vendor!: ElementRef;
  vendorId: any;
  searchatlasId: any;
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
  orderLen = 0;
  orderSuccess = false;
  sortTable: any;
  dataSrc = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  canOrder = false;
  isMod = false;
  orderTable: object[] = [];
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService
  ) {
    this.getAllVendors();
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId'];
      this.searchatlasId = params['atlasId'];
      if (this.searchatlasId) {
        console.log('got in', this.vendorId, this.searchatlasId);
        this.searchVendorId(this.vendorId!);
      }
    });
    
  }
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {}
  ngAfterViewInit() {}
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getAllVendors() {
    this.orderSuccess = false;

    this.getData
      .httpGetRequest('/dealer/get-vendors')
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
  filterTop(array: any) {
    let prodigal = array.filter((item: any) => {
      return item.atlas_id == this.searchatlasId!;
    });
    let newArray = array.filter((item: any) => {
      // console.log('item reduce', item.atlas_id !== this.searchatlasId, item);
      return item.atlas_id !== this.searchatlasId!;
    });
    // console.log(' filter res', prodigal, newArray);

    newArray.unshift(prodigal[0]);
    // console.log(' mutated res', newArray);

    return newArray;
  }
  getCart() {
    this.getData
      .httpGetRequest('/cart/all')
      .then((result: any) => {
        if (result.status) {
          // console.log('search vendor res', result.data);
          this.orderTable = result.data;

          $('table-ctn').addClass('highlight');
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  searchVendorId(id: any) {
    this.canOrder = false;

    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        if (result.status) {
          this.isMod = true;

          // console.log('search vendor res', result.data);
          this.tableData = result.data;
          this.dataSrc = new MatTableDataSource<PeriodicElement>(
            this.filterTop(result.data)
          );
          this.canOrder = true;
          this.dataSrc.sort = this.sort;
          this.dataSrc.paginator = this.paginator;
          $('table-ctn').addClass('highlight');
        } else {
          // this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        // this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  arrIntConverter(arr: any, x: any) {
    for (var i = 0; i < arr.length; i++) {
      let Obj = arr[i];
      let pre = Obj[`${x}`];
      pre.toString();
      Obj[`${x}`] = Obj[`${x}`].substring(pre.indexOf('-' + 1));
      console.log('object & string', Obj, pre, Obj[`${x}`]);
    }
    console.log('new array', arr);
    return arr;
  }
  getProductByVendorId() {

    this.canOrder = false;
    this.isMod = false;
    let id = this.vendor.nativeElement.value;
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        if (result.status) {
          console.log('search vendor res', result.data);
          this.tableData = result.data;
          if (result.data.length !== 0) {
            this.canOrder = true;
          }
          $('tbody tr:first').css('background', '#');
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
  runCalc(product: any, qty: any, i: any) {
    let price = parseFloat(product?.booking!);
    let posssibleBreak = false;
    let specData;
    let total = 0.0;

    let priceSummary = {
      specItem: false,
      assortItem: false,
      specCond: 0,
      specPrice: 0,
    };
    let grp;
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
       console.log(
        "userobj",
         usedVar,
         'table',
         this.orderTable
       );
    this.orderTable.push(usedVar);
    this.dataSrc.data[i].extended = total;
    // if (posssibleBreak && qty > priceSummary.specCond) {
    //   this.dataSrc.data[i].booking = priceSummary.specPrice;
    // } else {
    //    this.dataSrc.data[i].booking = priceSummary.specPrice;
    // }

    this.dataSrc.sort = this.sort;
    this.dataSrc.paginator = this.paginator;
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
  }
  submitOrder() {
    this.cartLoader = true;
    this.orderSuccess = false;

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
            this.cartLoader = false;
            this.orderSuccess = true;
            this.toastr.success(
              `${this.orderLen}  item(s) have been added to cart`,
              'Success'
            );
            this.orderTable = [];
            if (this.searchatlasId) {
              this.searchVendorId(this.vendorId!);
            } else {
              this.getProductByVendorId();
            }
          } else {
            this.cartLoader = false;

            this.toastr.info(`Something went wrong`, 'Error');
          }
        })
        .catch((err) => {
          this.cartLoader = false;

          this.toastr.info(`Something went wrong`, 'Error');
        });
    } else {
      this.cartLoader = false;

      this.toastr.info(`No item quantity has been set`, 'Error');
    }
  }
}
