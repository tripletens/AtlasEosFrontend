import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
export interface PeriodicElement {
  no: number;
  seminar_topic: string;
  date: string;
  vendor_name: string;
  meeting_time: string;
  link: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,

    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 2,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 3,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 4,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 5,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 6,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 7,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 8,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 9,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 10,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 11,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 12,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 13,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
  {
    no: 14,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
    link: 'link',
    date: 'wednesday, 10 November 2021',
  },
];

@Component({
  selector: 'app-all-seminars',
  templateUrl: './all-seminars.component.html',
  styleUrls: ['./all-seminars.component.scss'],
})
export class AllSeminarsComponent implements AfterViewInit {
  loader = true;
  tableView = false;
  tableData: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'no',
    'date',
    'meeting_time',
    'vendor_name',
    'seminar_topic',

    'link',
  ];
  noData = false;
  dataSrc = new MatTableDataSource<PeriodicElement>(this.tableData);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.FetchAllSeminars();
  }
  constructor(
    private request: HttpRequestsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  FetchAllSeminars() {
    this.tableView = false;
    this.loader = true;
    this.noData = false;

    this.request
      .httpGetRequest('/fetch-all-seminars')
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
          this.dataSrc.paginator = this.paginator;
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
}
