import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-purchases-dealer',
  templateUrl: './purchases-dealer.component.html',
  styleUrls: ['./purchases-dealer.component.scss'],
})
export class PurchasesDealerComponent implements OnInit {
  tableView = true
  loader = false
  constructor() {}

  ngOnInit(): void {}
}
