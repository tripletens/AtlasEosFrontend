import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-set-countdown',
  templateUrl: './set-countdown.component.html',
  styleUrls: ['./set-countdown.component.scss'],
})
export class SetCountdownComponent implements OnInit {
  TimerForm!: FormGroup
  manualChecker = false
  saveBtnStatus = true

  btnLoader = false
  btnText = true
  selectedTime: any

  constructor(
    private fb: FormBuilder,
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.buildProductForm()
  }

  timeChangeHandler(data: any) {
    this.selectedTime = data._formattedValueString

    console.log(data._formattedValueString)
    console.log(data)
  }

  submit() {
    console.log(this.TimerForm.value)
    if (this.TimerForm.status == 'VALID') {
      this.manualChecker = false
      this.saveBtnStatus = false
      this.btnText = false
      this.btnLoader = true

      this.TimerForm.value.countdownTime = this.selectedTime

      this.postData
        .httpPostRequest('/save-countdown', this.TimerForm.value)
        .then((result: any) => {
          this.saveBtnStatus = true
          if (result.status) {
            this.btnText = true
            this.btnLoader = false
            this.TimerForm.reset()
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
    this.TimerForm.reset()
  }

  get timerFormControls() {
    return this.TimerForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'countdownDate' &&
      this.timerFormControls.countdownDate.hasError('required')
    ) {
      return 'Select the date'
    } else if (
      instance === 'countdownTime' &&
      this.timerFormControls.countdownTime.hasError('required')
    ) {
      return 'Select the time'
    } else {
      return
    }
  }

  buildProductForm(): void {
    this.TimerForm = this.fb.group({
      countdownDate: ['', [Validators.required]],
      countdownTime: ['', [Validators.required]],
    })
  }
}
