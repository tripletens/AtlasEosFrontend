import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  checkCart = new Subject<any>();

  constructor() {}
}
