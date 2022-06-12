import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

export interface PeriodicElement {
  vendor_id: string
  vendor_name: string
  status: string
  created_date: string
}

@Component({
  selector: 'app-all-vendors',
  templateUrl: './all-vendors.component.html',
  styleUrls: ['./all-vendors.component.scss'],
})
export class AllVendorsComponent implements OnInit {
  tableView = false
  loader = true
  allVendor: any

  displayedColumns: string[] = [
    'vendor_id',
    'vendor_name',
    'status',
    'created_at',
    'action',
  ]

  dataSource: any

  loaderData = [9, 8, 6]

  constructor(
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  getVendors() {
    this.postData
      .httpGetRequest('/get-all-vendors')
      .then((result: any) => {
        console.log(result)
        this.loader = false
        this.tableView = true

        if (result.status) {
          this.dataSource = result.data

          //this.allVendor = result.data
        } else {
          this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        this.toastr.error('Try again', 'Something went wrong')
      })
  }

  ngOnInit(): void {
    this.getVendors()
  }
}
