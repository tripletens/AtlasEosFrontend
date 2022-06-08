import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
  no: number
  seminar_topic: string
  vendor_name: string
  meeting_time: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    no: 1,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
  },
  {
    no: 2,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
  },
  {
    no: 3,
    seminar_topic: 'Hydrogen',
    vendor_name: 'achawayne sixtus',
    meeting_time: 'first seminar',
  },
]

@Component({
  selector: 'app-all-seminars',
  templateUrl: './all-seminars.component.html',
  styleUrls: ['./all-seminars.component.scss'],
})
export class AllSeminarsComponent implements OnInit {
  loader = true
  tableView = false

  displayedColumns: string[] = [
    'no',
    'seminar_topic',
    'vendor_name',
    'meeting_time',
  ]
  dataSource = ELEMENT_DATA
  constructor() {}

  ngOnInit(): void {}
}
