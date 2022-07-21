import { LiveAnnouncer } from '@angular/cdk/a11y'
import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, Sort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ToastrService } from 'ngx-toastr'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { CommonModule, CurrencyPipe } from '@angular/common'

export interface PeriodicElement {
  qty: any
  atlas_id: any
  vendor: string
  description: string
  booking: number
  special: number
  extended: number
}

declare var $: any

@Component({
  selector: 'app-test-quick-order',
  templateUrl: './test-quick-order.component.html',
  styleUrls: ['./test-quick-order.component.scss'],
})
export class TestQuickOrderComponent implements OnInit {
  searchId = ''
  searchLoader = true
  searchStatus = false
  noData = false
  allCategoryData: any
  searchResultData: any
  disabled = true
  disabledBtn = true
  addLoader = false
  addSuccess = false
  orderTotal: any
  @ViewChild('vendorInput') vendorInput!: ElementRef
  @ViewChild('qtyInput') qtyInput!: ElementRef
  @ViewChild('searchid') atlasInput!: ElementRef

  orderTable: object[] = []
  cartHistory: object[] = []
  orderLen = 0
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
  sortTable: any
  dataSrc = new MatTableDataSource<PeriodicElement>()
  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  canOrder = false
  isMod = false
  cartLoader = false
  orderSuccess = false

  //////// Achawayne ///////

  quickOrderData: any
  loaderInput = false
  assortedType = false
  addItemTable: any = []
  noItemFound = false
  normalPrice = 0
  currentProductAmt = 0

  dummyAmt = 0
  userData: any

  @ViewChildren('extend')
  extendField!: QueryList<ElementRef>
  currentQty = ''

  //////// Achawayne stopped /////////

  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private token: TokenStorageService,
    private _liveAnnouncer: LiveAnnouncer,
    private currencyPipe: CurrencyPipe,
  ) {
    // this.searchResultData.vendor_name = '';
    //  this.fetchProductById()
    // this.getCart()
    ///this.fetchQuickOrderCart()
  }
  @ViewChild(MatSort)
  sort!: MatSort
  ngOnInit(): void {
    this.userData = this.token.getUser()
  }

  //////////// Achawayne /////////////////////

  oneAddBtn() {
    // let allProCount = this.productData.length
    let addedState = false
    let inCart = false
    let postItem = []
    this.cartLoader = true

    if (this.currentQty != '') {
      this.addLoader = true
      this.addSuccess = false

      let rawUnit = document.getElementById('u-price-' + 0)?.innerText
      let unit = rawUnit?.replace(',', '.')

      let rawPrice = document.getElementById('amt-hidd-' + 0)?.innerHTML
      // let realPrice = rawPrice?.replace('$', '')
      let newPrice = rawPrice?.replace(',', '.')

      let cartData = {
        uid: this.userData.id,
        dealer: this.userData.account_id,
        vendor_id: this.quickOrderData[0].vendor,
        atlas_id: this.quickOrderData[0].atlas_id,
        product_id: this.quickOrderData[0].id,
        qty: this.currentQty,
        price: newPrice,
        unit_price: unit,
        groupings: this.quickOrderData[0].grouping,
        type: 'null',
        vendor_no: this.quickOrderData[0].vendor_product_code,
      }

      postItem.push(cartData)

      let postData = {
        uid: this.userData.id,
        dealer: this.userData.account_id,
        product_array: JSON.stringify(postItem),
      }

      this.getData
        .httpPostRequest('/dealer/submit-quick-order', postData)
        .then((res: any) => {
          console.log(res)
          if (res.status) {
            this.cartLoader = false
            this.toastr.success(`${res.message} `, 'Success')

            this.addLoader = false
            this.addSuccess = true

            this.orderTable = []
            this.atlasInput.nativeElement.value = null
            this.vendorInput.nativeElement.value = null
            this.qtyInput.nativeElement.value = null
            this.searchStatus = false
            // this.fetchQuickOrderCart()
          } else {
            this.cartLoader = false
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          this.cartLoader = false
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(`Please logout and login again`, 'Session Expired')
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })

      console.log(postItem)
    }
  }

  runCalculation(qty: any, index: number) {
    if (qty != '') {
      this.currentQty = qty
      let curr = this.quickOrderData[index]
      let atlasId = curr.atlas_id
      let spec = curr.spec_data

      if (spec.length > 0) {
        let arr = this.extendField.toArray()[index]
        let specialAmt = 0
        let specialCond = 0
        let specData = this.quickOrderData[index].spec_data
        this.normalPrice = parseFloat(this.quickOrderData[index].booking)
        for (let i = 0; i < specData.length; i++) {
          let curAmt = parseFloat(specData[i].special)
          let cond = parseInt(specData[i].cond)
          let orignialAmt = parseFloat(specData[i].booking)
          specData[i].arrIndex = i
          let nextArr = i + 1
          let len = specData.length
          if (qty >= cond) {
            this.normalPrice = curAmt
            $('.normal-booking-' + index).css('display', 'none')
            $('.special-booking-' + index + '-' + specData[i].arrIndex).css(
              'display',
              'inline-block',
            )
            let g = i - 1
            let nxt = i + 1
            if (specData[nxt]) {
              $('.special-booking-' + index + '-' + nxt).css('display', 'none')
            } else {
            }
            $('.special-booking-' + index + '-' + g).css('display', 'none')
          } else {
            this.normalPrice = this.normalPrice
            $('.special-booking-' + index + '-' + i).css('display', 'none')
            let nxt = i + 1
            let pre = i - 1
            if (specData[nxt]) {
              let cond = specData[nxt].cond
              if (qty < cond) {
                $('.normal-booking-' + index).css('display', 'inline-block')
              } else {
                $('.normal-booking-' + index).css('display', 'none')
              }
              $('.normal-booking-' + index).css('display', 'none')
            } else {
              let preData = specData[pre]
              if (preData) {
                let preCond = parseInt(preData.cond)
                if (qty >= preCond) {
                  $('.normal-booking-' + index).css('display', 'none')
                } else {
                }
              } else {
                $('.normal-booking-' + index).css('display', 'inline-block')
              }
              if (qty >= cond) {
                $('.normal-booking-' + index).css('display', 'none')
              } else {
              }
            }
          }
          if (qty >= cond) {
            this.normalPrice = curAmt
          } else {
            this.normalPrice = this.normalPrice
          }

          console.log(this.normalPrice, 'tesrs')
        }
        let calAmt = qty * this.normalPrice
        this.currentProductAmt = calAmt
        $('#u-price-' + index).html(this.normalPrice)
        let formattedAmt = this.currencyPipe.transform(calAmt, '$')
        arr.nativeElement.innerHTML = formattedAmt
        $('#amt-' + index).html(formattedAmt)
        $('#amt-hidd-' + index).html(calAmt)
      } else {
        let quantity = parseInt(qty)
        let price = parseFloat(curr.booking)

        let calAmt = quantity * price
        this.currentProductAmt = calAmt

        ///console.log(price, 'unit Price');
        $('#u-price-' + index).html(price)

        $('.normal-booking-' + index).css('display', 'inline-block')

        let formattedAmt = this.currencyPipe.transform(calAmt, '$')
        $('#amt-' + index).html(formattedAmt)
        $('#amt-hidd-' + index).html(calAmt)
      }
    } else {
      let curr = this.quickOrderData[index]
      let spec = curr.spec_data
      $('.normal-booking-' + index).css('display', 'none')
      if (spec != null) {
        for (let h = 0; h < spec.length; h++) {
          $('.special-booking-' + index + '-' + h).css('display', 'none')
        }
      }

      let formattedAmt = this.currencyPipe.transform(0, '$')
      $('#amt-' + index).html(formattedAmt)
    }
  }

  fetchProductById() {
    let atlasId = this.searchId
    this.noData = false
    this.disabled = true
    this.loaderInput = true

    console.log('search id', atlasId)
    if (atlasId !== '') {
      this.searchStatus = false
      this.searchLoader = true
      this.getData
        .httpGetRequest('/dealer/get-item-by-atlas-vendor-code/' + atlasId)
        .then((res: any) => {
          this.loaderInput = false

          if (res.status) {
            this.searchStatus = true
            this.searchLoader = false
            this.noItemFound = res.data.filtered_data.length > 0 ? false : true

            this.searchResultData = res.data
            this.quickOrderData = res.data.filtered_data
            this.assortedType = res.data.assorted
            this.noData = false
            this.disabled = false
          } else {
            this.searchStatus = false
            this.searchLoader = false
            this.noData = true
            this.disabled = true
          }
        })
        .catch((err: any) => {
          this.loaderInput = false

          this.searchStatus = false
          this.searchLoader = false
          this.noData = true
          this.disabled = true
          console.log(err)
          this.toastr.error('Something went wrong, try again', ' Error')
        })
    } else {
    }
  }

  /////////// Achawayne Stopped ///////////////////

  addToQuickOrder() {
    this.addLoader = true
    this.addSuccess = false

    let uid = this.token.getUser().id.toString()
    let accntId = this.token.getUser().account_id
    this.orderLen = this.orderTable.length
    if (this.orderTable.length > 0) {
      let formdata = {
        uid: uid,
        dealer: accntId,
        product_array: JSON.stringify(this.orderTable),
      }
      this.getData
        .httpPostRequest('/dealer/submit-quick-order', formdata)
        .then((result: any) => {
          if (result.status) {
            this.addLoader = false
            this.addSuccess = true
            this.toastr.success(
              `${this.orderLen}  item have been added to order`,
              'Success',
            )
            this.orderTable = []
            this.atlasInput.nativeElement.value = null
            this.vendorInput.nativeElement.value = null
            this.qtyInput.nativeElement.value = null
            this.searchStatus = false
            ///   this.fetchQuickOrderCart()
          } else {
            this.addLoader = false

            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          this.addLoader = false
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(`Please logout and login again`, 'Session Expired')
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
    } else {
      this.addLoader = false

      this.toastr.info(`No item quantity has been set`, 'Error')
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }
  parser(data: any) {
    return JSON.parse(data)
  }

  qtyInputCheck(qty: any, runcalc: boolean) {
    if (qty > 0) {
      this.disabledBtn = false
      {
        runcalc && this.runCalc(this.searchResultData, qty, true)
      }
    } else {
      this.disabledBtn = true
    }
  }

  runCalc(product: any, qty: any, bool: boolean) {
    let price = parseFloat(product?.booking!)
    let posssibleBreak = false
    let specData
    let total = 0.0
    let arrHist: any = this.cartHistory
    let cart = this.orderTable
    let inCart = false
    let mutArr = arrHist.concat(cart)

    let priceSummary = {
      specItem: false,
      assortItem: false,
      specCond: 0,
      specPrice: 0,
    }
    let grp: any
    //check if in cart
    function checkInCartStatus(id: any) {
      console.log('entered check status', mutArr, mutArr.length > 0)

      if (mutArr.length > 0) {
        for (let y = 0; y < mutArr.length; y++) {
          console.log('check cart mut', id, mutArr[y].atlas_id)

          if (mutArr[y]?.atlas_id == id) {
            inCart = true
          }
        }
      }
    }
    checkInCartStatus(product.atlas_id)

    console.log('incart check', inCart)

    if (!inCart) {
      console.log('grping', grp)
      //set grouping
      if (product.grouping == null || undefined) {
        grp = ''
        console.log('grping', grp)
      } else {
        grp = product.grouping
        console.log('grping else', grp)
      }
      // set product data for order table
      let usedVar = {
        vendor_id: product.vendor,
        atlas_id: product.atlas_id,
        qty: qty,
        price: '0',
        unit_price: price.toString(),
        product_id: product.id.toString(),
        groupings: grp,
      }
      //set specdata
      if (product.spec_data) {
        specData = JSON.parse(product.spec_data)
        posssibleBreak = true
        for (var x = 0; x < specData?.length; x++) {
          let lev = specData[x]
          if (lev.type == 'special') {
            priceSummary.specItem = true
            priceSummary.specCond = lev.cond
            priceSummary.specPrice = lev.special
          }
          if (lev.type == 'assorted') {
            priceSummary.assortItem = true
            priceSummary.specCond = lev.cond
            priceSummary.specPrice = lev.special
          }
        }
      }

      function replaceOldVal(arr: any) {
        if (arr?.length > 0) {
          for (var j = 0; j < arr?.length; j++) {
            let Obj: any = arr[j]!
            if (Obj?.atlas_id == product.atlas_id) {
              arr.splice(j, 1)
            }
          }
        }
      }

      function calcTotal() {
        if (qty > 0) {
          // has spec condition
          if (posssibleBreak) {
            //has special condition
            if (priceSummary.specItem) {
              console.log('step 3')
              //hit special qty condition

              if (qty >= priceSummary.specCond) {
                total = qty * priceSummary.specPrice
                usedVar.unit_price = priceSummary.specPrice.toString()

                console.log('step 3', total)
              } else {
                // doesnt hit special qty condition

                console.log('second else', total)
                total = qty * price
                console.log('below second else', total)
              }
            }
            //has assorted condition
            else if (priceSummary.assortItem) {
              console.log('mutArrray assort', mutArr)
              //check if items in cart are in thesame group
              let groupQty = qty
              for (var j = 0; j < mutArr?.length; j++) {
                let Obj = mutArr[j]!
                if (product?.grouping) {
                  if (Obj.grouping == grp) {
                    groupQty = qty + Obj.qty
                  }
                }
              }
              //hit assorted qty condition
              if (groupQty >= priceSummary.specCond) {
                total = qty * priceSummary.specPrice
                usedVar.unit_price = priceSummary.specPrice.toString()
                console.log('entered ', total)
              } else {
                //doesnt hit assorted qty condition

                console.log('second else assort', total)
                total = qty * price
                console.log('below second else assort', total)
              }
            }
          } else {
            // doesnt have spec condition

            console.log('first else', total)
            total = qty * price
            console.log('below first else', total)
          }
        } else {
          replaceOldVal(cart)
        }
        total = total
        usedVar.price = total.toString()
      }

      calcTotal()

      replaceOldVal(this.orderTable)
      console.log('userobj', usedVar, 'table', this.orderTable)
      this.orderTable.push(usedVar)
      if (bool) {
        this.addToQuickOrder()
      }
      console.log(
        'total val',
        total,
        price,
        qty,
        posssibleBreak,
        'price sum',
        priceSummary,
        'var added',
        usedVar,
        'table',
        this.orderTable,
      )
    } else {
      this.toastr.info(``, 'This item has been added to cart')
    }
  }

  getTotal() {
    let total = 0
    if (this.dataSrc.data.length > 0) {
      for (var i = 0; i < this.dataSrc.data.length; i++) {
        let Obj: any = this.dataSrc.data[i]!
        total = total + parseFloat(Obj.price!)
      }
      return (this.orderTotal = total)
    } else {
      return (this.orderTotal = 0)
    }
  }

  deleteQuickOrderItem(id: any) {
    let uid = this.token.getUser().id.toString()

    if (this.dataSrc.data.length > 0) {
      this.orderLen = this.dataSrc.data.length
      this.getData
        .httpGetRequest('/delete-quick-order-items-atlas-id/' + uid + '/' + id)
        .then((result: any) => {
          if (result.status) {
            this.toastr.success(
              `  Quick order items have been removed `,
              'Success',
            )
            this.orderTable = []
            this.getCart()
            this.fetchQuickOrderCart()
            this.canOrder = false
          } else {
            this.cartLoader = false

            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          this.cartLoader = false
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(`Please logout and login again`, 'Session Expired')
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
    } else {
      this.cartLoader = false

      this.toastr.info(`No item has been added to quick order cart`, 'Error')
    }
  }

  fetchQuickOrderCart() {
    this.canOrder = false
    this.isMod = false
    let id = this.token.getUser()?.id
    this.getData
      .httpGetRequest('/fetch-quick-order-items-user-id/' + id)
      .then((result: any) => {
        console.log(result, 'promotion')

        if (result.status) {
          console.log('search vendor res', result.data)
          this.tableData = result.data
          if (result.data.length !== 0) {
            this.canOrder = true
          }
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

  getCart() {
    let id = this.token.getUser().account_id
    this.getData
      .httpGetRequest('/cart/dealer/' + id)
      .then((result: any) => {
        if (result.status) {
          console.log('dealer id', result?.data)
          this.cartHistory = result?.data
        } else {
          this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error')
      })
  }
  submitOrder() {
    this.cartLoader = true
    this.orderSuccess = false

    let uid = this.token.getUser().id.toString()
    let accntId = this.token.getUser().account_id
    this.orderLen = this.orderTable.length
    if (this.dataSrc.data.length > 0) {
      let formdata = {
        uid: uid,
        dealer: accntId,
      }
      console.log('adding to quick cart', formdata)
      this.getData
        .httpPostRequest('/move-quick-order', formdata)
        .then((result: any) => {
          if (result.status) {
            this.cartLoader = false
            this.orderSuccess = true
            this.toastr.success(
              `${this.orderLen}  item(s) have been added to cart`,
              'Success',
            )
            this.orderTable = []
            this.getCart()
            this.fetchQuickOrderCart()
          } else {
            this.cartLoader = false

            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          this.cartLoader = false
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(`Please logout and login again`, 'Session Expired')
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
    } else {
      this.cartLoader = false

      this.toastr.info(`No item quantity has been set`, 'Error')
    }
  }
  clearCart() {
    let uid = this.token.getUser().id.toString()

    if (this.dataSrc.data.length > 0) {
      this.orderLen = this.dataSrc.data.length
      this.getData
        .httpGetRequest('/delete-quick-order-items-user-id/' + uid)
        .then((result: any) => {
          if (result.status) {
            this.toastr.success(
              `${this.orderLen}  item(s) have been Deleted from cart`,
              'Success',
            )
            this.orderTable = []
            this.getCart()
            this.fetchQuickOrderCart()
            this.canOrder = false
          } else {
            this.cartLoader = false

            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
        .catch((err) => {
          this.cartLoader = false
          if (err.message.response.dealer || err.message.response.dealer) {
            this.toastr.info(`Please logout and login again`, 'Session Expired')
          } else {
            this.toastr.info(`Something went wrong`, 'Error')
          }
        })
    } else {
      this.cartLoader = false

      this.toastr.info(`No item has been added to quick order cart`, 'Error')
    }
  }
}
