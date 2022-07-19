import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ActivatedRoute } from '@angular/router'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-view-report-ticket',
  templateUrl: './view-report-ticket.component.html',
  styleUrls: ['./view-report-ticket.component.scss'],
})
export class ViewReportTicketComponent implements OnInit {
  ticket = ''
  reportTitleData: any
  reportReply: any
  reportLoader = true
  reportDataStatus = false
  reportTitleStatus = false
  replyMsg = ''
  userData: any
  formLoader = false
  btnText = true
  constructor(
    private getData: HttpRequestsService,
    private route: ActivatedRoute,
    private token: TokenStorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.ticket = params['ticket']
      this.getReportReplies()
      this.getCreatedReport()
    })

    this.userData = this.token.getUser()
  }

  sendReply() {
    if (this.replyMsg != '') {
      this.formLoader = true
      this.btnText = false
      let data = {
        replyMsg: this.replyMsg,
        userId: this.userData.id,
        role: this.userData.role,
        ticket: this.ticket,
        replier: this.userData.first_name + ' ' + this.userData.last_name,
      }

      this.getData
        .httpPostRequest('/dealer/save-dealer-reply', data)
        .then((result: any) => {
          this.reportLoader = false
          this.formLoader = false
          this.btnText = true

          if (result.status) {
            this.toastr.success('succesfull', 'Saved')

            this.replyMsg = ''
            this.getReportReplies()
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          // this.reportStatus = false
          // this.reportLoader = false
          this.toastr.info(`Something went wrong`, 'Error')
        })

      console.log(data)
    }
  }

  getCreatedReport() {
    this.getData
      .httpGetRequest('/dealer/get-ticket-first/' + this.ticket)
      .then((result: any) => {
        this.reportTitleStatus = true
        if (result.status) {
          this.reportTitleData = result.data
          //this.reportStatus = true
        } else {
          //this.reportStatus = false
          //this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        // this.reportStatus = false
        // this.reportLoader = false
        /// this.toastr.info(`Something went wrong`, 'Error')
      })
  }

  getReportReplies() {
    this.getData
      .httpGetRequest('/dealer/get-report-replies/' + this.ticket)
      .then((result: any) => {
        this.reportLoader = false

        this.reportDataStatus = true

        if (result.status) {
          this.reportReply = result.data
          //this.reportStatus = true
        } else {
          //this.reportStatus = false
          //this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        // this.reportStatus = false
        // this.reportLoader = false
        /// this.toastr.info(`Something went wrong`, 'Error')
      })
  }
}
