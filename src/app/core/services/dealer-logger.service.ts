import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DealerLoggerService {
  loggedIn = new Subject<any>();

  constructor() {}
}
