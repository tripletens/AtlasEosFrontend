import { Component, OnInit, ViewChild } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { ToastrService } from 'ngx-toastr'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import Swal from 'sweetalert2'

declare var $: any

export interface PeriodicElement {
  full_name: string
  email: string
  password: string
  company_name: string
  status: string
  created_date: string
}

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.scss'],
})
export class AllAdminComponent implements OnInit {
  tableView = false
  loader = true
  allVendor: any
  loaderData = [9, 8, 6]
  incomingData: any

  displayedColumns: string[] = [
    'full_name',
    'email',
    'password',
    'company_name',
    'status',
    'created_date',
    'action',
  ]

  dataSource = new MatTableDataSource<PeriodicElement>()
  @ViewChild(MatPaginator) paginator!: MatPaginator

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  ngOnInit(): void {
    this.getDealerUsers()
  }

  pageSizes = [3, 5, 7]

  constructor(
    private postData: HttpRequestsService,
    private toastr: ToastrService,
  ) {}

  async removeVendor(index: any) {
    let confirmStatus = await this.confirmBox()

    if (confirmStatus) {
      $('#remove-icon-' + index).css('display', 'none')
      $('#remove-loader-' + index).css('display', 'inline-block')

      this.postData
        .httpGetRequest('/deactivate-admin/' + index)
        .then((result: any) => {
          $('#remove-icon-' + index).css('display', 'inline-block')
          $('#remove-loader-' + index).css('display', 'none')

          if (result.status) {
            this.toastr.success('Successful', result.message)
            this.getDealerUsers()
          } else {
            this.toastr.error('Something went wrong', 'Try again')
          }
        })
        .catch((err) => {
          this.toastr.error('Something went wrong', 'Try again')
        })
    } else {
    }
  }

  async confirmBox() {
    return await Swal.fire({
      title: 'You Are About To Remove This Vendor User',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        return true
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false
      } else {
        return false
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.incomingData.vendor_name = filterValue.trim().toLowerCase()
    this.dataSource = this.filterArray('*' + filterValue)
  }

  filterArray(expression: string) {
    var regex = this.convertWildcardStringToRegExp(expression)
    //console.log('RegExp: ' + regex);
    return this.incomingData.filter(function (item: any) {
      return regex.test(item.full_name)
    })
  }

  escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  convertWildcardStringToRegExp(expression: string) {
    var terms = expression.split('*')

    var trailingWildcard = false

    var expr = ''
    for (var i = 0; i < terms.length; i++) {
      if (terms[i]) {
        if (i > 0 && terms[i - 1]) {
          expr += '.*'
        }
        trailingWildcard = false
        expr += this.escapeRegExp(terms[i])
      } else {
        trailingWildcard = true
        expr += '.*'
      }
    }

    if (!trailingWildcard) {
      expr += '.*'
    }

    return new RegExp('^' + expr + '$', 'i')
  }

  getDealerUsers() {
    this.postData
      .httpGetRequest('/all-admins')
      .then((result: any) => {
        console.log(result)

        if (result.status) {
          this.allVendor = result.data
          // this.dataSource = result.data
          this.loader = false
          this.tableView = true
          this.incomingData = result.data
          this.dataSource = new MatTableDataSource<PeriodicElement>(result.data)

          this.dataSource.paginator = this.paginator
        } else {
          // this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        // this.toastr.error('Try again', 'Something went wrong')
      })
  }
}
