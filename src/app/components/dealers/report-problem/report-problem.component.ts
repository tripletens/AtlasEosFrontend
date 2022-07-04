import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.component.html',
  styleUrls: ['./report-problem.component.scss'],
})
export class ReportProblemComponent implements OnInit {
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('photo') photo!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  imgData: any;
  imgURL2: any;
  formError = false;
  formLoader = false;
  constructor() {}

  ngOnInit(): void {}
 
}
