import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-special-orders',
  templateUrl: './special-orders.component.html',
  styleUrls: ['./special-orders.component.scss'],
})
export class SpecialOrdersComponent implements OnInit {
  tableView = true
  loader = false
  constructor() {}

  ngOnInit(): void {}
}
