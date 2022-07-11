import { Component, OnInit } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

@Component({
  selector: 'app-resolve-problem',
  templateUrl: './resolve-problem.component.html',
  styleUrls: ['./resolve-problem.component.scss'],
})
export class ResolveProblemComponent implements OnInit {
  tableView = true
  loader = false
  reportProblemsData: any
  reportLoader = true

  constructor(private postData: HttpRequestsService) {}

  ngOnInit(): void {
    this.getAllReport()
  }

  getAllReport() {
    this.postData
      .httpGetRequest('/get-all-reports')
      .then((result: any) => {
        console.log(result)
        this.reportLoader = false

        if (result.status) {
          this.reportProblemsData = result.data
          this.loader = false
          this.tableView = true
        } else {
          // this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {
        // this.toastr.error('Try again', 'Something went wrong')
      })
  }
}
