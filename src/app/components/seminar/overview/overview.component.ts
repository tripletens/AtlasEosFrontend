import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  loader = true
  tableView = false

  totalOrder = 0
  totalDealer = 0
  totalProducts = 0
  totalCatalogue = 0
  totalCardedProduct = 0
  totalServicePart = 0
  recentOrders: any
  totalAmount = 0
  constructor(private getData: HttpRequestsService) {}

  ngOnInit(): void {
    this.getDashboardData()
  }

  getDashboardData() {
    this.getData
      .httpGetRequest('/admin-dashboard')
      .then((result: any) => {
        console.log(result)
        this.tableView = true
        this.loader = false
        if (result.status) {
          this.totalCardedProduct = result.data.total_carded_products
          this.totalServicePart = result.data.total_service_parts
          this.totalProducts = result.data.total_products
          this.totalDealer = result.data.total_dealers
          this.totalCatalogue = result.data.total_catalogue_orders
          this.totalAmount = result.data.total_amount
          this.totalOrder = result.data.total_orders
          this.recentOrders = result.data.recent_orders
          //this.allCategoryData = result.data;
        } else {
        }
      })
      .catch((err) => {
        this.loader = false
      })
  }
}