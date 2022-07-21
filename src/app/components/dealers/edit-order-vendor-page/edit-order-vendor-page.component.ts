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
import Swal from 'sweetalert2';
export interface PeriodicElement {
  atlas_id: any;
  vendor: string;
  description: string;
  booking: number;
  special: number;
  extended: number;
}

@Component({
  selector: 'app-edit-order-vendor-page',
  templateUrl: './edit-order-vendor-page.component.html',
  styleUrls: ['./edit-order-vendor-page.component.scss'],
})
export class EditOrderVendorPageComponent implements OnInit {
  tableData: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'qty',
    'atlas_id',
    'vendor',
    'description',
    'booking',
    'special',
    'extended',
    'actions',
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
  cartHistory: object[] = [];
  orderTotal = 0;
  allCategoryData: any;
  cartLoader = false;
  vendorId: any;
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService
  ) {
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId'];

      if (this.vendorId) {
        console.log('got in', this.vendorId);
        this.getCartByVendorId(this.vendorId);
      }
    });
  }
  @ViewChild(MatSort)
  sort!: MatSort;

  ngOnInit(): void {}
  ngAfterViewInit() {}
  parser(data: any) {
    return JSON.parse(data);
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  async deleteOrderConfirmBox() {
    return await Swal.fire({
      title: 'Are You Sure You Want To Delete This Order(s)  ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        return true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      } else {
        return false;
      }
    });
  }

  async deleteOrder(id: any, i: any) {
    let confirmAlert = await this.deleteOrderConfirmBox();
    let dealerId = this.token.getUser().id;
    if (confirmAlert) {
      this.getData
        .httpGetRequest(
          '/delete-order-items-atlas-id-user-id/' + id + '/' + dealerId
        )
        .then((res: any) => {
          if (res.status) {
            this.getCartByVendorId(this.vendorId)
            this.toastr.success(res.message);
          } else {
            this.toastr.error('Something went wrong ', `Try again`);
          }
        })
        .catch((error) => {
          this.toastr.error(error);
        });
    }
  }
  getTotal() {
    let total = 0;
    if (this.tableData.length > 0) {
      for (var i = 0; i < this.tableData.length; i++) {
        let Obj: any = this.tableData[i]!;
        total = total + parseFloat(Obj.price!);
      }
      return (this.orderTotal = total);
    } else {
      return (this.orderTotal = 0);
    }
  }
  getCartByVendorId(id: any) {
    this.canOrder = false;
    this.isMod = false;
    let dealer = this.token.getUser().account_id;

    this.getData
      .httpGetRequest(
        '/fetch-order-items-atlas-id-vendor-id/' + dealer + '/' + id
      )
      .then((result: any) => {
        console.log(result, 'promotion');

        if (result.status) {
          console.log('search vendor res', result.data);
          this.tableData = result.data;
          if (result.data.length !== 0) {
            this.canOrder = true;
          }
          this.orderTable = [];
          this.getTotal();

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
}
