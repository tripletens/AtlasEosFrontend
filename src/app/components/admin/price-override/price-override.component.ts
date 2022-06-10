import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-price-override',
  templateUrl: './price-override.component.html',
  styleUrls: ['./price-override.component.scss'],
})
export class PriceOverrideComponent implements OnInit {
  tableView = true
  loader = false
  constructor() {}

  ngOnInit(): void {}
}
