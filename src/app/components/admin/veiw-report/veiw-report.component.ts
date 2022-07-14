import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

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
  userData: any
  userRole = ''
  ReplyReportForm!: FormGroup
  manualChecker = false
  btnText = true
  btnLoader = false
  currentReportData: any
  reportReplyData: any

  currentReply = false
  currentStatus = false
  reportLoader = true

  constructor(
    private route: ActivatedRoute,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
    private tokeStore: TokenStorageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildFaqForm()
    this.userData = this.tokeStore.getUser()
    this.userRole = this.userData.role
    this.route.params.subscribe((params) => {
      this.ticket = params['ticket']
      this.getReport()
      this.getCurrenTicket()
      this.getReportReply()
    })
  }

  submit() {
    if (this.ReplyReportForm.status == 'VALID') {
      this.manualChecker = false

      this.ReplyReportForm.value.role = this.userData.role
      this.ReplyReportForm.value.userId = this.userData.id
      this.ReplyReportForm.value.ticket = this.ticket
      this.ReplyReportForm.value.replier =
        this.userData.first_name + ' ' + this.userData.last_name

      this.btnText = false
      this.btnLoader = true

      this.postData
        .httpPostRequest(
          '/admin/save-admin-report-reply',
          this.ReplyReportForm.value,
        )
        .then((result: any) => {
          this.btnText = true
          this.btnLoader = false

          if (result.status) {
            this.ReplyReportForm.reset()
            this.getReportReply()
            this.toastr.success('Successful', result.message)
          } else {
            this.toastr.error(result.message, 'Try again')
          }
        })
        .catch((err) => {
          this.btnText = true
          this.btnLoader = false
          this.toastr.error('Try again', 'Something went wrong')
        })

      console.log(this.ReplyReportForm.status)
    } else {
      this.manualChecker = true
    }
  }

  buildFaqForm(): void {
    this.ReplyReportForm = this.fb.group({
      replyMsg: ['', [Validators.required]],
    })
  }

  get replyProblemFormControls() {
    return this.ReplyReportForm.controls
  }

  getReportReply() {
    this.postData
      .httpGetRequest('/admin/get-report-reply/' + this.ticket)
      .then((result: any) => {
        console.log(result)

        this.currentReply = true

        if (result.status) {
          this.reportReplyData = result.data
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

  getCurrenTicket() {
    this.postData
      .httpGetRequest('/admin/get-current-ticket/' + this.ticket)
      .then((result: any) => {
        console.log(result)

        this.currentStatus = true
        this.reportLoader = false

        if (result.status) {
          this.currentReportData = result.data
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

  getErrorMessage(instance: string) {
    if (
      instance === 'replyMsg' &&
      this.replyProblemFormControls.replyMsg.hasError('required')
    ) {
      return 'enter the message'
    } else {
      return
    }
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

  asyncGetReport() {
    this.postData
      .httpGetRequest('/admin/get-report-problem/' + this.ticket)
      .then((result: any) => {
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
