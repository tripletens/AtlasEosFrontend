import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UpdateItem } from 'src/app/core/model/update-item'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  tableView = true
  loader = false
  selectedData: any
  editItemForm!: FormGroup

  editItem = new UpdateItem('', '', '', '', '')
  saveBtnState = true
  deleteBtnState = true

  productId!: string | number
  selectedDataDescription: string = ''

  constructor(
    private postData: HttpRequestsService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id']
      this.getCurrentItem()
    })
  }

  getCurrentItem() {
    this.postData
      .httpGetRequest('/get-product/' + this.productId)
      .then((result: any) => {
        if (result.status) {
          this.selectedData = result.data
          this.editItem.atlasId = this.selectedData.atlas_id
          this.editItem.vendor = this.selectedData.vendor
          this.editItem.desc = this.selectedData.description
          this.editItem.regular = this.selectedData.booking
          this.editItem.special = this.selectedData.special
        } else {
          //this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        //this.toastr.error('Something went wrong', 'Try again')
      })
  }

  deactivateItem() {
    if (this.editItem.atlasId != '') {
      this.deleteBtnState = false

      this.postData
        .httpGetRequest('/deactivate-product/' + this.productId)
        .then((result: any) => {
          this.deleteBtnState = true
          if (result.status) {
            this.toastr.success(result.message, 'Successful')

            this.editItem.atlasId = ''
            this.editItem.vendor = ''
            this.editItem.desc = ''
            this.editItem.regular = ''
            this.editItem.special = ''
          } else {
            //this.toastr.error(result.message, 'Try again')
          }
        })
        .catch((err) => {
          //this.toastr.error('Something went wrong', 'Try again')
        })
    }
  }

  saveUpdate() {
    if (this.editItem.atlasId != '') {
      this.saveBtnState = false
      console.log(this.editItem)

      this.postData
        .httpPostRequest('/edit-product', this.editItem)
        .then((result: any) => {
          this.saveBtnState = true

          console.log(result)

          if (result.status == true) {
            this.toastr.success('Successful', result.message)
          } else {
            this.toastr.error('Server Error', 'Try again')
          }
        })
        .catch((err) => {
          this.saveBtnState = true
          this.toastr.error('Try again', 'Something went wrong')
        })
    }
  }

  applyFilter(data: Event) {
    const filterValue = (data.target as HTMLInputElement).value

    this.postData
      .httpGetRequest('/get-product-atlas-id/' + filterValue)
      .then((result: any) => {
        if (result.status) {
          this.selectedData = result.data
          this.editItem.atlasId = this.selectedData.atlas_id
          this.editItem.vendor = this.selectedData.vendor
          this.editItem.desc = this.selectedData.description
          this.selectedDataDescription = this.selectedData.description
          this.editItem.regular = this.selectedData.booking
          this.editItem.special = this.selectedData.special
        } else {
          //this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        //this.toastr.error('Something went wrong', 'Try again')
      })
  }
}
