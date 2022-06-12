import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

export interface PeriodicElement {
  vendor: string
  company_name: string
  status: string
  created_date: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    vendor: 'S0002',
    company_name: 'ATLAS SHOWCASE',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S1310',
    company_name: 'DINOSAUR ELECTRONICS',
    status: 'inactive',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S1075',
    company_name: 'BLUE OX',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S0750',
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

  displayedColumns: string[] = [
    'vendor',
    'company_name',
    'status',
    'created_date',
    'action',
  ]

  dataSource = ELEMENT_DATA

  loaderData = [9, 8, 6]

  ngOnInit(): void {
    this.getVendorUsers()
  }

  constructor(
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  getVendorUsers() {
    this.postData
      .httpGetRequest('/get-all-vendor-users')
      .then((result: any) => {
        console.log(result)

        if (result.status) {
          this.allVendor = result.data
        } else {
          // this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        // this.toastr.error('Try again', 'Something went wrong')
      })
  }
}
