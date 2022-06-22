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
  link =
    'https://us02web.zoom.us/rec/play/lJTtcY76xGwVXmiPNL7Tpu096KLlKXw0dcnuJXyTrbSITjKQKmLfz44_n8iQaxIZp0QPxJ2R6NAcEMq7.NwDu1E74CTu692Bl?startTime=1652304851000&_x_zm_rtaid=3vJprS7PTn-BZSCVGrdKXg.1654937390766.c442308e0b7a0a5b19682f9dc5f7862d&_x_zm_rhtaid=321';
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
