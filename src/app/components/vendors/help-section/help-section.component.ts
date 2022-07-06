import { Component, OnInit, ViewChild } from '@angular/core'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

@Component({
  selector: 'app-help-section',
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
})
export class HelpSectionComponent implements OnInit {
  tableView = true
  loader = false
  userData: any
  privilegedVendors: any
  selectedVendorName!: string
  selectedVendorCode!: string
  vendorProductData: any
  incomingData: any
  sn = 0
  selectedState = false

  noDataFound = false
  totalAmount: number = 0

  constructor(
    private tokenData: TokenStorageService,
    private httpServer: HttpRequestsService,
  ) {
    this.userData = tokenData.getUser()
  }

  ngOnInit(): void {}

  getSalesSummary() {
    if (this.selectedVendorCode) {
      this.selectedState = true

      this.tableView = false
      this.loader = true
      this.httpServer
        .httpGetRequest(
          '/vendor/get-sales-by-item-detailed/' + this.selectedVendorCode,
        )
        .then((result: any) => {
          this.tableView = true
          this.loader = false
          console.log(result)
          if (result.status) {
            this.tableView = true
            this.incomingData = result.data.res
            this.noDataFound = result.data.res.length > 0 ? false : true
            if (result.data.length > 0) {
              for (let index = 0; index < result.data.res.length; index++) {
                const each = result.data.res[index]
                this.totalAmount += parseFloat(each.total)
              }
            }
          } else {
          }
        })
        .catch((err) => {})
    }
  }

  selectedVendor(data: any) {
    this.selectedVendorName = data.vendor_name
    this.selectedVendorCode = data.vendor_code
  }

  getPrivilegedVendors() {
    this.httpServer
      .httpGetRequest(
        '/vendor/get-privileged-vendors/' +
          this.userData.id +
          '/' +
          this.userData.vendor_code,
      )
      .then((result: any) => {
        console.log(result)
        if (result.status) {
          this.privilegedVendors = result.data
        } else {
        }
      })
      .catch((err) => {})
  }
}
