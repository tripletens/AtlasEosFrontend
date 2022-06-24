import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-vendor-order',
  templateUrl: './vendor-order.component.html',
  styleUrls: ['./vendor-order.component.scss'],
})
export class VendorOrderComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
