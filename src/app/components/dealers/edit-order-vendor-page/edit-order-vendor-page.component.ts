import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { filter } from 'rxjs'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { MatSortModule } from '@angular/material/sort'
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { CommonModule, CurrencyPipe } from '@angular/common'

declare var $: any

export interface PeriodicElement {
  atlas_id: any
  vendor: string
  description: string
  booking: number
  special: number
  extended: number
}

@Component({
  selector: 'app-edit-order-vendor-page',
  templateUrl: './edit-order-vendor-page.component.html',
  styleUrls: ['./edit-order-vendor-page.component.scss'],
})
export class EditOrderVendorPageComponent implements OnInit {
  tableData: PeriodicElement[] = []
  displayedColumns: string[] = [
    'qty',
    'atlas_id',
    'vendor',
    'description',
    'booking',
    'special',
    'extended',
    'actions',
  ]
  orderLen = 0
  orderSuccess = false
  sortTable: any
  dataSrc = new MatTableDataSource<PeriodicElement>()
  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  canOrder = false
  isMod = false
  orderTable: object[] = []
  cartHistory: object[] = []
  orderTotal = 0
  allCategoryData: any
  cartLoader = false
  vendorId: any
  loader = true

  ///////// Import for calculation ///////////

  assortedItems: [] | any = []
  currentState: [] | any = []

  assortFilter: [] | any = []
  assortSecondFilter: [] | any = []
  newTotalArray: [] | any = []

  cartData: any

  @ViewChildren('extend')
  extendField!: QueryList<ElementRef>

  @ViewChildren('trRow')
  tableRow!: QueryList<ElementRef>

  normalPrice = 0
  currentProductAmt = 0

  /////// end of importation //////////

  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService,
    private currencyPipe: CurrencyPipe,
  ) {
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId']

      if (this.vendorId) {
        console.log('got in', this.vendorId)
        this.getCartByVendorId(this.vendorId)
      }
    })
  }
  @ViewChild(MatSort)
  sort!: MatSort

  ngOnInit(): void {}
  ngAfterViewInit() {}
  parser(data: any) {
    return JSON.parse(data)
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  runCalculation(index: number, qty: any) {
    if (qty !== '') {
      let curr = this.cartData[index]
      let spec = curr.spec_data
      let curAtlasId = curr.atlas_id

      if (spec.length > 0) {
        for (let j = 0; j < spec.length; j++) {
          const f = spec[j]
          if (f.type == 'assorted') {
            let incomingQty = qty
            curr.quantity = qty
            curr.pos = index

            this.assortFilter.push(curr)
            for (let h = 0; h < this.cartData.length; h++) {
              let r = this.cartData[h]
              r.pos = h
              this.assortFilter.push(r)
            }
            for (let y = 0; y < this.assortFilter.length; y++) {
              const t = this.assortFilter[y]
              if (t.id == curr.id) {
                //console.log('correct');
              } else {
                this.assortFilter.push(curr)
              }

              var newarr = this.assortFilter.filter(
                (x: any, y: any) => this.assortFilter.indexOf(x) == y,
              )

              let secondPhase = []
              let secPhase = []
              let letsContinue = false
              let testData = []

              for (let h = 0; h < newarr.length; h++) {
                const e = newarr[h]
                if (e.grouping == curr.grouping) {
                  // console.log(e);
                  secondPhase.push(e.spec_data)
                  if (e.spec_data.length > 0) {
                    letsContinue = true

                    e.spec_data.pos = e.pos
                    e.spec_data.quantity =
                      curAtlasId == e.atlas_id ? qty : e.qty
                    e.spec_data.atlas_id = e.atlas_id
                    e.spec_data.group = e.grouping
                    e.spec_data.incomingQty = incomingQty

                    for (let t = 0; t < e.spec_data.length; t++) {
                      let ele = e.spec_data[t]
                      ele.quantity = e.qty
                      ele.pos = e.pos
                      ele.atlas_id = e.atlas_id
                      ele.arrIndex = t
                    }
                  } else {
                    let price = parseFloat(e.booking)
                    let quantity = parseInt(e.quantity)
                    let newPrice = price * quantity
                    let formattedAmt = this.currencyPipe.transform(
                      newPrice,
                      '$',
                    )

                    /********** OUTLET ************/
                    $('#unit-price-hidden-' + e.pos).html(price)
                    $('#price-hidden-' + e.pos).html(newPrice)
                    let curPrice = this.currencyPipe.transform(price, '$')

                    //  this.updateCartItem(qty, newPrice, price, index);

                    $('#u-price-' + e.pos).html(curPrice)
                    $('#amt-' + e.pos).html(formattedAmt)
                    $('#amt-hidd-' + e.pos).html(newPrice)
                  }
                }
              }

              if (letsContinue) {
                let newTotalAss = 0
                let status = false
                for (let h = 0; h < secondPhase.length; h++) {
                  const k = secondPhase[h]
                  newTotalAss += parseInt(k.quantity)
                  //console.log(k[h].cond);
                  if (newTotalAss >= parseInt(k[h].cond)) {
                    status = true
                    ////console.log(k, newTotalAss);
                  } else {
                    for (let hy = 0; hy < secondPhase.length; hy++) {
                      const elj = secondPhase[hy]
                      console.log(elj.atlas_id, elj.quantity)

                      let booking = parseFloat(elj[0].booking)
                      let newPrice = parseInt(elj.quantity) * booking
                      let formattedAmt = this.currencyPipe.transform(
                        newPrice,
                        '$',
                      )

                      $('#unit-price-hidden-' + elj.pos).html(booking)
                      $('#price-hidden-' + elj.pos).html(newPrice)
                      $('#u-price-' + elj.pos).html(booking)
                      $('#amt-' + elj.pos).html(formattedAmt)
                      $('#amt-hidd-' + elj.pos).html(newPrice)
                    }

                    // console.log(newTotalAss, 'tesy');

                    for (let h = 0; h < k.length; h++) {
                      const el = k[h]
                      let prev = h - 1
                      let next = h + 1
                      let totalLength = k.length
                      let checkNext = k[1].cond ? k[1].cond : k[0].cond

                      if (newTotalAss >= el.cond && newTotalAss < checkNext) {
                        for (let ji = 0; ji < secondPhase.length; ji++) {
                          const elt = secondPhase[ji]

                          let special = parseFloat(elt[0].special)
                          let newPrice = parseInt(elt.quantity) * special
                          let formattedAmt = this.currencyPipe.transform(
                            newPrice,
                            '$',
                          )

                          console.log('100 up we are here')
                          $('#unit-price-hidden-' + elt.pos).html(special)
                          $('#price-hidden-' + elt.pos).html(newPrice)
                          $('#u-price-' + elt.pos).html(special)
                          $('#amt-' + elt.pos).html(formattedAmt)
                          $('#amt-hidd-' + elt.pos).html(newPrice)
                        }
                      } else {
                      }
                    }
                  }
                }

                // console.log(newTotalAss);

                if (status) {
                  //// If total Assorted is greater than condition /////
                  for (let i = 0; i < secondPhase.length; i++) {
                    const jk = secondPhase[i]
                    let currArrLength = jk.length
                    for (let j = 0; j < jk.length; j++) {
                      --currArrLength
                      const backWard = jk[currArrLength]
                      const frontWard = jk[j]
                      if (
                        newTotalAss < backWard.cond &&
                        newTotalAss >= frontWard.cond
                      ) {
                        console.log('we are here')
                      } else {
                        console.log('300 up we are here')

                        let special = parseFloat(jk[j].special)
                        let newPrice = parseInt(jk.quantity) * special
                        let formattedAmt = this.currencyPipe.transform(
                          newPrice,
                          '$',
                        )
                        console.log(formattedAmt)

                        $('#unit-price-hidden-' + jk[j].pos).html(special)
                        $('#price-hidden-' + jk[j].pos).html(newPrice)

                        $('#u-price-' + jk[j].pos).html(special)
                        $('#amt-' + jk[j].pos).html(formattedAmt)
                        $('#amt-hidd-' + jk[j].pos).html(newPrice)
                      }
                    }
                  }
                } else {
                  /// console.log(secondPhase);
                  /// if total Assorted is not greater than condition /////
                }
              }
            }
          } else {
            let arr = this.extendField.toArray()[index]
            let specialAmt = 0
            let specialCond = 0
            let specData = this.cartData[index].spec_data
            this.normalPrice = parseFloat(this.cartData[index].booking)
            for (let i = 0; i < specData.length; i++) {
              let curAmt = parseFloat(specData[i].special)
              let cond = parseInt(specData[i].cond)
              let orignialAmt = parseFloat(specData[i].booking)

              if (qty >= cond) {
                this.normalPrice = curAmt
              } else {
                this.normalPrice = this.normalPrice
              }
            }

            let curPrice = this.currencyPipe.transform(this.normalPrice, '$')
            $('#u-price-' + index).html(curPrice)

            let calAmt = qty * this.normalPrice
            this.currentProductAmt = calAmt

            this.cartData[index].price = calAmt
            this.cartData[index].quantity = qty
            this.cartData[index].uPrice = this.normalPrice

            let formattedAmt = this.currencyPipe.transform(calAmt, '$')
            //arr.nativeElement.innerHTML = formattedAmt;

            /********** OUTLET ************/
            $('#unit-price-hidden-' + index).html(this.normalPrice)
            $('#price-hidden-' + index).html(calAmt)

            ///  this.updateCartItem(qty, calAmt, this.normalPrice, index);

            $('#amt-' + index).html(formattedAmt)
            $('#amt-hidd-' + index).html(calAmt)
            this.newTotalArray.push(calAmt)
            // this.runTotalCal();
          }
        }
      } else {
        let quantity = parseInt(qty)
        let price = parseFloat(curr.booking)

        let calAmt = quantity * price
        this.currentProductAmt = calAmt

        this.cartData[index].price = calAmt
        this.cartData[index].quantity = qty
        this.cartData[index].uPrice = price

        let curPrice = this.currencyPipe.transform(price, '$')
        $('#u-price-' + index).html(curPrice)

        let formattedAmt = this.currencyPipe.transform(calAmt, '$')
        //arr.nativeElement.innerHTML = formattedAmt;
        /********** OUTLET ************/

        /// this.updateCartItem(qty, calAmt, price, index);

        $('#unit-price-hidden-' + index).html(price)
        $('#price-hidden-' + index).html(calAmt)

        $('#amt-' + index).html(formattedAmt)
        $('#amt-hidd-' + index).html(calAmt)
        this.newTotalArray.push(calAmt)
        // this.runTotalCal();
      }
    } else {
    }
  }

  getTotal() {
    let total = 0
    if (this.tableData.length > 0) {
      for (var i = 0; i < this.tableData.length; i++) {
        let Obj: any = this.tableData[i]!
        total = total + parseFloat(Obj.price!)
      }
      return (this.orderTotal = total)
    } else {
      return (this.orderTotal = 0)
    }
  }
  getCartByVendorId(id: any) {
    this.canOrder = false
    this.isMod = false
    let dealer = this.token.getUser().account_id

    this.getData
      .httpGetRequest(
        '/fetch-order-items-atlas-id-vendor-id/' + dealer + '/' + id,
      )
      .then((result: any) => {
        console.log(result, 'promotion')
        this.loader = false
        if (result.status) {
          console.log('search vendor res', result.data)
          this.tableData = result.data
          this.cartData = result.data

          if (result.data.length !== 0) {
            this.canOrder = true
          }
          this.orderTable = []
          this.getTotal()

          this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data)
          this.dataSrc.sort = this.sort
          this.dataSrc.paginator = this.paginator
        } else {
          this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error')
      })
  }
}
