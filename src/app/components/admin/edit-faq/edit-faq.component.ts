import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss'],
})
export class EditFaqComponent implements OnInit {
  faqForm!: FormGroup
  manualChecker = false

  btnText = true
  btnLoader = false
  faqId: any

  constructor(
    private fb: FormBuilder,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buildFaqForm()

    this.route.params.subscribe((params) => {
      this.faqId = params['id']
      this.getFaqData(this.faqId)
    })
  }

  getFaqData(idData: any) {
    this.postData
      .httpGetRequest('/get-faq-id/' + idData)
      .then((result: any) => {
        console.log(result)

        if (result.status) {
          this.faqForm = this.fb.group({
            title: [result.data.title, [Validators.required]],
            subtitle: [result.data.subtitle, [Validators.required]],
            description: [result.data.description, [Validators.required]],
            link: [result.data.link],
            role: [result.data.role, [Validators.required]],
          })
        } else {
          this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        this.btnText = true
        this.btnLoader = false
        this.toastr.error('Try again', 'Something went wrong')
      })
  }

  submit() {
    if (this.faqForm.status == 'VALID') {
      this.manualChecker = false

      this.faqForm.value.id = this.faqId

      this.btnText = false
      this.btnLoader = true
      this.postData
        .httpPostRequest('/edit-faq', this.faqForm.value)
        .then((result: any) => {
          console.log(result)
          this.btnText = true
          this.btnLoader = false

          if (result.status) {
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
