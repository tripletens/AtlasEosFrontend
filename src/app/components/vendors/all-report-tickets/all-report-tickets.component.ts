import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'

@Component({
  selector: 'app-all-report-tickets',
  templateUrl: './all-report-tickets.component.html',
  styleUrls: ['./all-report-tickets.component.scss'],
})
export class AllReportTicketsComponent implements OnInit {
  reportData: any
  reportStatus = false
  reportLoader = true
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private token: TokenStorageService,
  ) {
    this.getAllReports()
  }

  ngOnInit(): void {}
  getAllReports() {
    let id = this.token.getUser().id
    this.reportStatus = false

    this.getData
      .httpGetRequest('/get-all-reports/' + id)
      .then((result: any) => {
        // console.log(result);
        this.reportLoader = false

        if (result.status) {
          this.reportData = result.data
          this.reportStatus = true
        } else {
          this.reportStatus = false

          this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        this.reportStatus = false
        this.reportLoader = false

        this.toastr.info(`Something went wrong`, 'Error')
      })
  }
}
