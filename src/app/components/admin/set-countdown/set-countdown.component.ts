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

  seletedStartTime = ''
  selectedEndTime = ''

  @ViewChild('endTime') endTime!: ElementRef

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
    if (data._id == 'startTimePicker') {
      this.seletedStartTime = data._formattedValueString
    }

    if (data._id == 'endtimePicker') {
      this.selectedEndTime = data._formattedValueString
    }

    console.log(data)
  }

  submit() {
    console.log(this.TimerForm.value)
    if (this.TimerForm.status == 'VALID') {
      this.manualChecker = false
      this.saveBtnStatus = false
      this.btnText = false
      this.btnLoader = true
      this.TimerForm.value.countdownStartTime = this.seletedStartTime
      this.TimerForm.value.countdownEndTime = this.selectedEndTime

      console.log(this.TimerForm)

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
      instance === 'countdownStartDate' &&
      this.timerFormControls.countdownStartDate.hasError('required')
    ) {
      return 'Select the start date'
    } else if (
      instance === 'countdownStartTime' &&
      this.timerFormControls.countdownStartTime.hasError('required')
    ) {
      return 'Select the start time'
    } else if (
      instance === 'countdownEndDate' &&
      this.timerFormControls.countdownEndDate.hasError('required')
    ) {
      return 'select the end date'
    } else if (
      instance === 'countdownEndTime' &&
      this.timerFormControls.countdownEndTime.hasError('required')
    ) {
      return 'select the end time'
    } else {
      return
    }
  }

  buildProductForm(): void {
    this.TimerForm = this.fb.group({
      countdownStartDate: ['', [Validators.required]],
      countdownStartTime: ['', [Validators.required]],
      countdownEndDate: ['', [Validators.required]],
      countdownEndTime: ['', [Validators.required]],
    })
  }
}
