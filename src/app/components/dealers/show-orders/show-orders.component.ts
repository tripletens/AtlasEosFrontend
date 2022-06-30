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

export interface PeriodicElement {
  atlas_id: string;
  vendor: string;
  description: string;
  booking: number;
  special: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    atlas_id: '',
    vendor: '',
    description: '',
    booking: 0,
    special: 0,
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
  dataSrc = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  orderBtnStatus = false;
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getAllVendors();
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId'];
      this.searchatlasId = params['atlasId'];
      this.searchVendorId(this.vendorId!);
    });
  }
  ngOnInit(): void {
   
  }
  ngAfterViewInit() {
    this.dataSrc.paginator = this.paginator;
  }

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
  filterTop(array: any) {
    let prodigal = array.filter((item: any) => {
      return item.atlas_id == this.searchatlasId;
    });
    let newArray = array.filter((item: any) => {
      // console.log('item reduce', item.atlas_id !== this.searchatlasId, item);
      return item.atlas_id !== this.searchatlasId;
    });
    console.log(' filter res', prodigal, newArray);

    newArray.unshift(prodigal[0]);
    console.log(' mutated res', newArray);

    return newArray;
  }
  searchVendorId(id: any) {
    this.orderBtnStatus = false;
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        if (result.status) {
          console.log('search vendor res', result.data);
          this.tableData = result.data;
          this.dataSrc = new MatTableDataSource<PeriodicElement>(
            this.filterTop(result.data)
          );
          this.orderBtnStatus = true;
          this.dataSrc.paginator = this.paginator;
          $('table-ctn').addClass('highlight');
        } else {
          this.orderBtnStatus = false;
          // this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        this.orderBtnStatus = false;
        // this.toastr.info(`Something went wrong`, 'Error');
      });
  }
  getProductByVendorId() {
    let id = this.vendor.nativeElement.value;
    this.orderBtnStatus = false;
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        if (result.status) {
          console.log('search vendor res', result.data);
          this.tableData = result.data;
          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data);
          this.dataSrc.paginator = this.paginator;
          this.orderBtnStatus = true;
        } else {
          this.toastr.info(`Something went wrong`, 'Error');
          this.orderBtnStatus = false;
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error');
        this.orderBtnStatus = false;
      });
  }
}
