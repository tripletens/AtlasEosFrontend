import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

export interface PeriodicElement {
  id: number;
  topic: string;
  seminar_date: string;
  vendor_name: string;
  start_time: string;
  link: string;
  status: any;
}
@Component({
  selector: 'app-ongoing-seminars',
  templateUrl: './ongoing-seminars.component.html',
  styleUrls: ['./ongoing-seminars.component.scss'],
})
export class OngoingSeminarsComponent implements AfterViewInit {
  loader = true;
  tableView = false;
  tableData: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'id',
    'seminar_date',
    'start_time',
    'vendor_name',
    'topic',
    'status',
    'link',
  ];
  noData = false;
  dataSrc = new MatTableDataSource<PeriodicElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.FetchAllSeminars();
  }
  constructor(
    private request: HttpRequestsService,
    private http: HttpClient,
    private toastr: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService
  ) {}
  @ViewChild(MatSort)
  sort!: MatSort;
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  FetchAllSeminars() {
    this.tableView = false;
    this.loader = true;
    this.noData = false;

    this.request
      .httpGetRequest('/fetch-ongoing-seminars')
      .then((result: any) => {
        console.log(result);
        this.tableView = true;
        this.loader = false;
        if (result.status) {
          this.tableData = result.data;
          console.log('data result', this.tableData, result.data.length);
          if (result.data.length == 0) {
            this.noData = true;
          }
          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data);
          this.dataSrc.paginator = this.paginator;
          this.dataSrc.sort = this.sort;
        } else {
          this.toastr.error('Something went wrong', `${result.message}`);
          this.noData = true;
        }
      })
      .catch((err) => {
        this.toastr.error('Try again', 'Something went wrong');
        this.noData = true;
      });
  }
  bookmarkSeminar(id: any, stat: any, current: any) {
    let dealer = this.token.getUser().account_id;
    let formdata = {
      seminar_id: id,
      dealer_id: dealer,
      bookmark_status: 1,
      current_seminar_status: current,
    };
    this.request
      .httpPostRequest('/join-seminar', formdata)
      .then((result: any) => {
        console.log(result);

        if (result.status) {
          console.log('data result', this.tableData, result.data.length);
          this.toastr.success('Seminar has been bookmarked', `Success`);
        } else {
          this.toastr.error('Something went wrong', `Error`);
        }
      })
      .catch((err) => {
        this.toastr.error('Try again', 'Something went wrong');
      });
  }
}
