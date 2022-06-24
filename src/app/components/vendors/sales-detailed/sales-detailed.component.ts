import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-sales-detailed',
  templateUrl: './sales-detailed.component.html',
  styleUrls: ['./sales-detailed.component.scss'],
})
export class SalesDetailedComponent implements OnInit {
  tableView = true
  loader = false
  constructor() {}

  ngOnInit(): void {}
}
