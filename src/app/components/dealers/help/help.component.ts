import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  faqData: any;
  faqDataStatus = false;
  faqLoader = true;
  link = 'https://www.youtube.com/watch?v=010K4j8oi_4';
  constructor(
    private request: HttpRequestsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.FetchFaq();
  }
  FetchFaq() {
    this.faqDataStatus = false;
    this.faqLoader = true;
    this.request
      .httpGetRequest('/fetch-all-faqs')
      .then((result: any) => {
        console.log(result);
        this.faqDataStatus = true;
        this.faqLoader = false;
        if (result.status) {
          this.faqData = result.data;
        } else {
          this.toastr.error('Something went wrong', `${result.message}`);
        }
      })
      .catch((err) => {
        this.toastr.error('Try again', 'Something went wrong');
      });
  }
}
