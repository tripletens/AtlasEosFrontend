import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-resolve-problem',
  templateUrl: './resolve-problem.component.html',
  styleUrls: ['./resolve-problem.component.scss'],
})
export class ResolveProblemComponent implements OnInit {
  tableView = true
  loader = false

  constructor() {}

  ngOnInit(): void {}
}
