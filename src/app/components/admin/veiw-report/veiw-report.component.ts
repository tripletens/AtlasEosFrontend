import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-veiw-report',
  templateUrl: './veiw-report.component.html',
  styleUrls: ['./veiw-report.component.scss'],
})
export class VeiwReportComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
