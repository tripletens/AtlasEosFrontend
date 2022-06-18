import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

declare var $: any

@Component({
  selector: 'app-add-seminar',
  templateUrl: './add-seminar.component.html',
  styleUrls: ['./add-seminar.component.scss'],
})
export class AddSeminarComponent implements OnInit {
  productForm!: FormGroup
  manualChecker = false
  saveBtnStatus = true

  constructor(
    private fb: FormBuilder,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildProductForm()
  }

  submit() {
    if (this.productForm.status == 'VALID') {
      this.manualChecker = false
      this.saveBtnStatus = false

      this.postData
        .httpPostRequest('/add-product', this.productForm.value)
        .then((result: any) => {
          this.saveBtnStatus = true
          if (result.status) {
            this.productForm.reset()
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
    this.productForm.reset()
  }

  get productFormControls() {
    return this.productForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'vendorAccount' &&
      this.productFormControls.vendorAccount.hasError('required')
    ) {
      return 'enter vendor account code'
    } else if (
      instance === 'atlasId' &&
      this.productFormControls.atlasId.hasError('required')
    ) {
      return 'enter atlas ID'
    } else if (
      instance === 'vendorItemId' &&
      this.productFormControls.vendorItemId.hasError('required')
    ) {
      return 'enter vendor item ID'
    } else if (
      instance === 'description' &&
      this.productFormControls.description.hasError('required')
    ) {
      return 'enter description'
    } else if (
      instance === 'regular' &&
      this.productFormControls.regular.hasError('required')
    ) {
      return 'enter the regular price'
    } else if (
      instance === 'special' &&
      this.productFormControls.special.hasError('required')
    ) {
      return 'enter the special price'
    } else {
      return
    }
  }

  buildProductForm(): void {
    this.productForm = this.fb.group({
      vendorAccount: ['', [Validators.required]],
      atlasId: ['', [Validators.required]],
      vendorItemId: ['', [Validators.required]],
      description: ['', [Validators.required]],
      regular: ['', [Validators.required]],
      special: ['', [Validators.required]],
    })
  }
}
