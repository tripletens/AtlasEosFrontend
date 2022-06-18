import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-all-seminars',
  templateUrl: './all-seminars.component.html',
  styleUrls: ['./all-seminars.component.scss'],
})
export class AllSeminarsComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
