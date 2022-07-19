import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

@Component({
  selector: 'app-price-override',
  templateUrl: './price-override.component.html',
  styleUrls: ['./price-override.component.scss'],
})
export class PriceOverrideComponent implements OnInit {
  tableView = true
  loader = false
  atlasCode = ''
  dealerCode = ''
  cartData: any
  newQty = ''
  newPrice = ''
  noOrderFound = false
  dataInbound = false

  constructor(private httpService: HttpRequestsService) {}

  ngOnInit(): void {}

  getDealerCart() {
    if (this.atlasCode != '' && this.dealerCode != '') {
      this.loader = true
      this.tableView = false

      this.httpService
        .httpGetRequest(
          '/admin/get-price-override/' + this.dealerCode + '/' + this.atlasCode,
        )
        .then((result: any) => {
          this.loader = false
          this.tableView = true

          if (result.status) {
            this.cartData = result.data

            this.dataInbound = this.cartData != '' ? true : false

            this.noOrderFound = this.cartData != '' ? false : true
          } else {
            // this.toastr.error(result.message, 'Try again')
          }
        })
        .catch((err) => {
          // this.toastr.error('Try again', 'Something went wrong')
        })
    }
  }
}
