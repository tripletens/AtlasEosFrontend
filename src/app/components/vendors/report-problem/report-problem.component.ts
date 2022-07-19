import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss'],
})
export class ReportProblemComponent implements OnInit {
  tableView = true
  loader = false
  userData: any
  faqData: any
  faqForm!: FormGroup
  manualChecker = false

  btnText = true
  btnLoader = false
  selectedfileName!: any
  @ViewChild('attachmentFile') csvFile!: ElementRef
  attachmentDataFile: any
  fileSelected = false

  constructor(
    private tokenData: TokenStorageService,
    private httpServer: HttpRequestsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.userData = tokenData.getUser()
  }

  ngOnInit(): void {
    this.buildFaqForm()
  }

  callUploadInput() {
    this.csvFile.nativeElement.click()
  }

  fileCsvUpload(files: any) {
    if (files.length === 0) return
    var mimeType = files[0].type
    // if (mimeType !== 'application/*') {
    //   this.toastr.error(
    //     'File type not supported, upload a CSV file',
    //     `Upload Error`,
    //   )
    //   return
    // }

    this.selectedfileName = files[0].name
    this.fileSelected = true
    this.attachmentDataFile = files
  }

  submit() {
    if (this.faqForm.status == 'VALID') {
      this.manualChecker = false

      this.btnText = false
      this.btnLoader = true

      let fd = new FormData()
      fd.append('subject', this.faqForm.value.subject)
      fd.append('description', this.faqForm.value.description)
      fd.append('user_id', this.userData.id)
      fd.append('role', this.userData.role)
      fd.append('vendor_id', this.userData.vendor_code)

      if (this.fileSelected) {
        fd.append('csv', this.attachmentDataFile[0])
      }

      this.httpServer
        .uploadFile('/create-report', fd)
        .then((result) => {
          this.btnText = true
          this.btnLoader = false
          if (result.status) {
            this.faqForm.reset()
            this.toastr.success(
              'Report has been submitted successfully',
              `Success`,
            )
          } else {
            this.toastr.error('Somethin went wrong, Try again', `Try again`)
          }
        })
        .catch((err) => {
          this.btnText = true
          this.btnLoader = false
          this.toastr.error('Somethin went wrong, Try again', `Try again`)
        })
    } else {
      this.manualChecker = true
      // this.toastr.error('Try again', 'Something went wrong')
    }
  }

  buildFaqForm(): void {
    this.faqForm = this.fb.group({
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
  }

  get faqFormControls() {
    return this.faqForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'subject' &&
      this.faqFormControls.subject.hasError('required')
    ) {
      return 'enter the report subject'
    } else if (
      instance === 'description' &&
      this.faqFormControls.description.hasError('required')
    ) {
      return 'enter the report description'
    } else {
      return
    }
  }
}
