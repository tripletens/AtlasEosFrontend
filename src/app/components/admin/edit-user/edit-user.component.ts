import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  vendorUserForm!: FormGroup
  manualChecker = false
  btnText = true
  btnLoader = false

  constructor() {}

  ngOnInit(): void {}

  submit() {}

  get vendorUserFormControls() {
    return this.vendorUserForm.controls
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'vendorName' &&
      this.vendorUserFormControls.vendorName.hasError('required')
    ) {
      return 'enter vendor name'
    } else if (
      instance === 'vendorCode' &&
      this.vendorUserFormControls.vendorCode.hasError('required')
    ) {
      return 'enter vendor code'
    } else {
      return
    }
  }
}
