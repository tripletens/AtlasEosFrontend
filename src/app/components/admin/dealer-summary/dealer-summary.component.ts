import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dealer-summary',
  templateUrl: './dealer-summary.component.html',
  styleUrls: ['./dealer-summary.component.scss'],
})
export class DealerSummaryComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
