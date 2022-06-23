import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  adminForm!: FormGroup
  manualChecker = false
  saveBtnStatus = true

  uploadCsvSendBtn = false
  setCsvBtn = true
  csvDataFile: any
  csvBtnLoader = false
  csvBtnText = true

  @ViewChild('fileCsv') csvFile!: ElementRef

  imgURL!: any

  imgUploadStatus = false

  PreviewImg = false
  dummyImg = true
  csvForm!: FormGroup

  imgStatus = false
  imgFileCount = false

  step1 = true
  step2 = false
  btnLoader = false
  btnText = true

  constructor(
    private fb: FormBuilder,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildProductForm()
  }

  checkStepOne() {
    this.step1 = false
    this.step2 = true
  }

  Previous() {
    this.step1 = true
    this.step2 = false
  }

  callUploadInput() {
    this.csvFile.nativeElement.click()
  }

  fileCsvUpload(files: any) {
    if (files.length === 0) return
    var mimeType = files[0].type
    if (mimeType !== 'application/vnd.ms-excel') {
      this.toastr.error(
        'File type not supported, upload a CSV file',
        `Upload Error`,
      )
      return
    }

    this.uploadCsvSendBtn = true
    this.setCsvBtn = false
    this.csvDataFile = files
  }

  uploadCsvServer() {
    this.csvBtnLoader = true
    this.csvBtnText = false

    let fd = new FormData()
    fd.append('csv', this.csvDataFile[0])

    this.postData
      .uploadFile('/upload-admin-users', fd)
      .then((result) => {
        this.csvBtnLoader = false
        this.csvBtnText = true

        if (result.status) {
          this.dummyImg = true
          this.PreviewImg = false
          this.imgURL = ''
          this.setCsvBtn = true
          this.uploadCsvSendBtn = false

          this.toastr.success('Csv File Uploaded successfully', `Success`)
        } else {
          this.toastr.error('Somethin went wrong, Try again', `Uploading Error`)
        }
      })
      .catch((err) => {
        this.csvBtnLoader = false
        this.csvBtnText = true

        this.toastr.error('Somethin went wrong, Try again', `Uploading Error`)
      })
  }

  submit() {
    console.log(this.adminForm.value)
    if (this.adminForm.status == 'VALID') {
      this.manualChecker = false
      this.saveBtnStatus = false
      this.btnText = false
      this.btnLoader = true

      this.postData
        .httpPostRequest('/register-admin-users', this.adminForm.value)
        .then((result: any) => {
          this.saveBtnStatus = true
          if (result.status) {
            this.btnText = true
            this.btnLoader = false
            this.adminForm.reset()
            this.toastr.success(result.message, `Successful`)
          } else {
            this.toastr.error(result.message, 'Try again')
          }
        })
        .catch((err) => {
          this.saveBtnStatus = true

          this.toastr.error('Try again', 'Something went wrong')
        })
    } else {
      this.manualChecker = true
    }
  }

  resetForm() {
    this.adminForm.reset()
  }

  get adminFormControls() {
    return this.adminForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'fullName' &&
      this.adminFormControls.fullName.hasError('required')
    ) {
      return 'enter full name'
    } else if (
      instance === 'designation' &&
      this.adminFormControls.designation.hasError('required')
    ) {
      return 'enter the designation'
    } else if (
      instance === 'role' &&
      this.adminFormControls.role.hasError('required')
    ) {
      return 'select the role'
    } else if (
      instance === 'accountAccess' &&
      this.adminFormControls.accountAccess.hasError('required')
    ) {
      return 'enter account access level'
    } else if (
      instance === 'region' &&
      this.adminFormControls.region.hasError('required')
    ) {
      return 'enter the region'
    } else if (
      instance === 'email' &&
      this.adminFormControls.email.hasError('required')
    ) {
      return 'enter the email address'
    } else if (
      instance === 'password' &&
      this.adminFormControls.password.hasError('required')
    ) {
      return 'enter the password'
    } else {
      return
    }
  }

  buildProductForm(): void {
    this.adminForm = this.fb.group({
      fullName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      role: ['', [Validators.required]],
      accountAccess: ['', [Validators.required]],
      region: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
}
