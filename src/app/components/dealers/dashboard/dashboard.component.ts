import {
  Component,
  OnInit,
  DoCheck,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { HttpRequestsService } from 'src/app/core/services/http-requests.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  promotionalLoader = true;
  promotionalData = false;
  promotionalStatus = false;
  promotionalAds: any;
  allCategoryData: any;
  public chartOptions: any;
  countDownDate = new Date('June 25, 2022 15:37:25').getTime();
  count: any = 34;
  countDownElement = <HTMLInputElement>(
    document.getElementById('calc_table_amount')
  );
  pdfSrc =
    'https://atlasbookingprogram.com/assets/2022%20Booking%20Program%20Terms%20&%20Conditions.pdf';

  timeDays = 0;
  timeHours: number = 24;
  timeMinutes: number = 59;
  timeSeconds = 59;
  interval: any;

  countDownData: any;

  initialDays: number = 0;
  initialHours: number = 0;
  initialMinutes: number = 0;
  initialSeconds: number = 0;

  showSecondsExtrazero = false;
  constructor(private getData: HttpRequestsService) {
    this.getAllVendors();
    this.fetchFlyerAlt();
    this.chartOptions = {
      series: [
        {
          name: 'Sales summary',
          data: [30, 1500, 35000],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: '',
      },
      colors: {},
      xaxis: {
        categories: ['Day 1', 'Day 2', 'Day 3'],
      },
      yaxis: {
        categories: [
          '0',
          '5000',
          '10000',
          '15000',
          '20000',
          '25000',
          '30000',
          '35000',
          '40000',
          '45000',
        ],
      },
    };
    this.getProgramCountDown()
  }
  ngOnInit(): void {}
  pauseTimer() {
    clearInterval(this.interval);
  }
  startTimer(data: any) {
    let initialDays = data.days;
    let initialHours = data.hours;
    let initialMinutes = data.minutes;
    let initialSeconds = data.seconds;
    this.timeDays = data.days;

    if (data.hours > 24) {
      this.timeHours = 24;
    } else {
      this.timeHours = data.hours;
    }

    if (data.minutes > 59) {
      this.timeMinutes = 59;
    } else {
      this.timeMinutes = data.minutes;
    }

    if (data.seconds > 59) {
      this.timeSeconds = 59;
    } else {
      this.timeSeconds = data.seconds;
    }
    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;
      } else {
        this.timeSeconds = 59;
        this.timeMinutes--;

        if (this.timeMinutes == 0) {
          this.timeMinutes = 59;
          if (this.timeHours != 0) {
            this.timeHours--;
          } else {
            this.timeHours = 0;
          }
        }

        if (this.timeHours == 0) {
          this.timeHours = 24;
          if (this.timeDays != 0) {
            this.timeDays--;
          } else {
            this.timeDays = 0;
          }
        }
      }

      if (
        this.timeSeconds == 0 &&
        this.timeMinutes == 0 &&
        this.timeHours == 0 &&
        this.timeDays == 0
      ) {
        this.pauseTimer();
      }

      let stringSeconds = this.timeSeconds;
      let conventerStringSeconds = stringSeconds.toString();
      console.log(conventerStringSeconds.length);
      if (conventerStringSeconds.length == 1) {
        this.showSecondsExtrazero = true;
      } else {
        this.showSecondsExtrazero = false;
      }
    }, 1000);
  }
  getProgramCountDown() {
    this.getData
      .httpGetRequest('/get-countdown')
      .then((result: any) => {
        if (result.status) {
          ///  this.arrangeTimer(result.data)
          this.countDownData = result.data;
          this.startTimer(result.data);

          this.initialDays = result.data.days;
          this.initialHours = result.data.hours;
          this.initialMinutes = result.data.minutes;
          this.initialSeconds = result.data.seconds;
        } else {
        }
      })
      .catch((err) => {
        ///this.loader = false
      });
  }
  countDownTimer() {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = this.countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    // document.getElementById('countdown').innerText = this.count;
    let date = days + 'd ' + hours + 'h ' + minutes + 'm ';
    console.log('countdown', date);
    this.count = date;
    setInterval(this.countDownTimer(), 1000);

    return (this.count = days + 'd ' + hours + 'h ');
    // + minutes + 'm ' + seconds + 's '

    // If the count down is over, write some text
    // if (distance < 0) {
    //   clearInterval(x);
    //   document.getElementById('demo').innerHTML = 'EXPIRED';
    // }
  }
  getAllVendors() {
    this.getData
      .httpGetRequest('/promotional_fliers/vendors')
      .then((result: any) => {
        console.log(result);
        if (result.status) {
          this.allCategoryData = result.data;
        } else {
        }
      })
      .catch((err) => {});
  }
  fetchFlyer(data: any) {
    console.log(data.target.value);
    this.promotionalLoader = true;
    this.promotionalData = false;
    this.promotionalStatus = false;

    let id = data.target.value;
    console.log(id, 'id');
    this.getData
      .httpGetRequest('/show-promotional-flier-by-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        this.promotionalLoader = false;
        if (result.status) {
          // this.promotionalData = result.data.length > 0 ? true : false;
          // this.promotionalStatus = result.data.length <= 0 ? true : false;
          this.promotionalAds = result.data;
          this.promotionalData = true;
        } else {
        }
      })
      .catch((err) => {
        this.promotionalLoader = false;
        this.promotionalData = true;
      });
  }
  fetchFlyerAlt() {
    ///console.log(data.target.value);
    this.promotionalLoader = true;
    this.promotionalData = false;
    this.promotionalStatus = false;

    let id = 1;
    console.log(id, 'id');
    this.getData
      .httpGetRequest('/show-promotional-flier-by-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion');

        this.promotionalLoader = false;
        if (result.status) {
          // this.promotionalData = result.data.length > 0 ? true : false;
          // this.promotionalStatus = result.data.length <= 0 ? true : false;
          this.promotionalAds = result.data;
          this.promotionalData = true;
        } else {
        }
      })
      .catch((err) => {
        this.promotionalLoader = false;
        this.promotionalData = true;
      });
  }
}
