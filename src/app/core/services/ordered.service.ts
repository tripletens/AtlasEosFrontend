import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderedService {
  checkOrdered = new Subject<any>();

  constructor() {}
}
