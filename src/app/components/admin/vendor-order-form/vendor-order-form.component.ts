import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-vendor-order-form',
  templateUrl: './vendor-order-form.component.html',
  styleUrls: ['./vendor-order-form.component.scss'],
})
export class VendorOrderFormComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
