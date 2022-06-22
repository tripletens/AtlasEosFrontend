import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqForm!: FormGroup
  manualChecker = false

  btnText = true
  btnLoader = false

  constructor(
    private fb: FormBuilder,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildFaqForm()
  }

  submit() {
    if (this.faqForm.status == 'VALID') {
      this.manualChecker = false

      this.btnText = false
      this.btnLoader = true
      this.postData
        .httpPostRequest('/create-faq', this.faqForm.value)
        .then((result: any) => {
          console.log(result)
          this.btnText = true
          this.btnLoader = false

          if (result.status) {
            this.faqForm.reset()
            this.faqForm.value.role = 'Select Role'
            this.toastr.success(
              'FAQ Added Successful',
              `New FAQ has been added`,
            )
          } else {
            this.toastr.error(result.message, 'Try again')
          }
        })
        .catch((err) => {
          this.btnText = true
          this.btnLoader = false
          this.toastr.error('Try again', 'Something went wrong')
        })

      console.log(this.faqForm.status)
    } else {
      this.manualChecker = true
    }
  }

  buildFaqForm(): void {
    this.faqForm = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      link: [''],
      role: ['', [Validators.required]],
    })
  }

  get faqFormControls() {
    return this.faqForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'title' &&
      this.faqFormControls.title.hasError('required')
    ) {
      return 'enter faq title'
    } else if (
      instance === 'subtitle' &&
      this.faqFormControls.subtitle.hasError('required')
    ) {
      return 'enter faq subtitle'
    } else if (
      instance === 'description' &&
      this.faqFormControls.description.hasError('required')
    ) {
      return 'enter faq description'
    } else if (
      instance === 'role' &&
      this.faqFormControls.role.hasError('required')
    ) {
      return 'select faq role'
    } else {
      return
    }
  }
}
