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
  faqData: any

  constructor(
    private tokenData: TokenStorageService,
    private httpServer: HttpRequestsService,
  ) {
    this.userData = tokenData.getUser()
    this.getVendorFaq()
  }

  ngOnInit(): void {}

  getVendorFaq() {
    this.httpServer
      .httpGetRequest('/vendor/get-vendor-faq')
      .then((result: any) => {
        console.log(result)
        if (result.status) {
          this.faqData = result.data
        } else {
        }
      })
      .catch((err) => {})
  }
}
