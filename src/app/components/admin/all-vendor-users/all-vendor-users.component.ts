import { Component, OnInit, ViewChild } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

export interface PeriodicElement {
  full_name: string
  email: string
  password: string
  company_name: string
  status: string
  created_date: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'ATLAS SHOWCASE',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'DINOSAUR ELECTRONICS',
    status: 'inactive',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'BLUE OX',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    full_name: 'rests',
    email: 'achawayne@gmail.com',
    password: '7646473478348784',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
]

@Component({
  selector: 'app-all-vendor-users',
  templateUrl: './all-vendor-users.component.html',
  styleUrls: ['./all-vendor-users.component.scss'],
})
export class AllVendorUsersComponent implements OnInit {
  tableView = false
  loader = true
  allVendor: any
  loaderData = [9, 8, 6]
  incomingData: any

  displayedColumns: string[] = [
    'full_name',
    'email',
    'password',
    'company_name',
    'status',
    'created_date',
    'action',
  ]

  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
  // @ViewChild(MatPaginator) paginator!: MatPaginator

  dataSource = new MatTableDataSource<PeriodicElement>()
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.getVendorUsers()
  }

  pageSizes = [3, 5, 7]

  constructor(
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.incomingData.vendor_name = filterValue.trim().toLowerCase()

    this.dataSource = this.filterArray('*' + filterValue)

    //console.log(res)
  }

  filterArray(expression: string) {
    var regex = this.convertWildcardStringToRegExp(expression)
    //console.log('RegExp: ' + regex);
    return this.incomingData.filter(function (item: any) {
      return regex.test(item.full_name)
    })
  }

  escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  convertWildcardStringToRegExp(expression: string) {
    var terms = expression.split('*')

    var trailingWildcard = false

    var expr = ''
    for (var i = 0; i < terms.length; i++) {
      if (terms[i]) {
        if (i > 0 && terms[i - 1]) {
          expr += '.*'
        }
        trailingWildcard = false
        expr += this.escapeRegExp(terms[i])
      } else {
        trailingWildcard = true
        expr += '.*'
      }
    }

    if (!trailingWildcard) {
      expr += '.*'
    }

    return new RegExp('^' + expr + '$', 'i')
  }

  getVendorUsers() {
    this.postData
      .httpGetRequest('/get-all-vendor-users')
      .then((result: any) => {
        console.log(result)

        if (result.status) {
          this.allVendor = result.data
          // this.dataSource = result.data
          this.loader = false
          this.tableView = true
          this.incomingData = result.data
          this.dataSource = new MatTableDataSource<PeriodicElement>(result.data)

          this.dataSource.paginator = this.paginator
        } else {
          // this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        // this.toastr.error('Try again', 'Something went wrong')
      })
  }
}
