import { Component, OnInit } from '@angular/core'

export interface PeriodicElement {
  vendor: string
  company_name: string
  status: string
  created_date: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    vendor: 'S0002',
    company_name: 'ATLAS SHOWCASE',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S1310',
    company_name: 'DINOSAUR ELECTRONICS',
    status: 'inactive',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S1075',
    company_name: 'BLUE OX',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
  {
    vendor: 'S0750',
    company_name: 'CANADIAN RV MATS',
    status: 'active',
    created_date: 'Nov. 4, 2021, 9:24 a.m.',
  },
]

@Component({
  selector: 'app-all-vendors',
  templateUrl: './all-vendors.component.html',
  styleUrls: ['./all-vendors.component.scss'],
})
export class AllVendorsComponent implements OnInit {
  tableView = true
  loader = false

  displayedColumns: string[] = [
    'vendor',
    'company_name',
    'status',
    'created_date',
    'action',
  ]

  dataSource = ELEMENT_DATA

  constructor() {}

  ngOnInit(): void {}
}
