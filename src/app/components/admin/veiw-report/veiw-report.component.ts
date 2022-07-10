import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-veiw-report',
  templateUrl: './veiw-report.component.html',
  styleUrls: ['./veiw-report.component.scss'],
})
export class VeiwReportComponent implements OnInit {
  tableView = true
  loader = false
  ticket = ''
  currentTicketData: any

  constructor(
    private route: ActivatedRoute,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ticket = params['ticket']
      this.getReport()
    })
  }

  getReport() {
    this.postData
      .httpGetRequest('/admin/get-report-problem/' + this.ticket)
      .then((result: any) => {
        console.log(result)

        if (result.status) {
          this.currentTicketData = result.data
        } else {
          this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        //   this.btnText = true
        ///   this.btnLoader = false
        this.toastr.error('Try again', 'Something went wrong')
      })
  }
}
