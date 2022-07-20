import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  OnInit,
} from '@angular/core'
import Swal from 'sweetalert2'

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
import { DataSource } from '@angular/cdk/collections'

export interface PeriodicElement {
  atlas_id: any
  vendor: string
  description: string
  booking: number
  special: number
  extended: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    atlas_id: '',
    vendor: '',
    description: '',
    booking: 0,
    special: 0,
    extended: 0,
  },
]
declare var $: any
@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
})
export class ShowOrdersComponent implements OnInit {
  allCategoryData: any
  noData = false
  tableLoader = false
  tableStatus = false
  cartLoader = false
  productData: any
  selectVendor = 0
  @ViewChild('vendorId') vendor!: ElementRef
  vendorId: any
  searchatlasId: any
  tableData: PeriodicElement[] = []
  displayedColumns: string[] = [
    'qty',
    'atlas_id',
    'vendor',
    'description',
    'booking',
    'special',
    'extended',
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
  constructor(
    private getData: HttpRequestsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private token: TokenStorageService,
  ) {
    this.getAllVendors()
    this.route.params.subscribe((params) => {
      this.vendorId = params['vendorId']
      this.searchatlasId = params['atlasId']
      if (this.searchatlasId == 'vendor') {
        this.searchatlasId = undefined
      }
      console.log('testing waters', this.vendorId, this.searchatlasId)
      if (this.vendorId) {
        console.log('got in', this.vendorId, this.searchatlasId)
        this.searchVendorId(this.vendorId!)
        this.selectVendor = this.vendorId
      }
    })
    this.getCart()
  }
  @ViewChild(MatSort)
  sort!: MatSort

  ngOnInit(): void {}
  ngAfterViewInit() {}
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }
  getTotal() {
    let total = 0
    if (this.orderTable.length > 0) {
      for (var i = 0; i < this.orderTable.length; i++) {
        let Obj: any = this.orderTable[i]!
        total = total + parseFloat(Obj.price!)
      }
      return (this.orderTotal = total)
    } else {
      return (this.orderTotal = 0)
    }
  }
  getAllVendors() {
    this.orderSuccess = false

    this.getData
      .httpGetRequest('/dealer/get-vendors')
      .then((result: any) => {
        // console.log(result);
        if (result.status) {
          this.allCategoryData = result.data
          this.selectVendor = this.vendorId
        } else {
          this.toastr.info(`Something went wrong`, 'Error')
        }
      })
      .catch((err) => {
        this.toastr.info(`Something went wrong`, 'Error')
      })
  }
  filterTop(array: any) {
    let prodigal = array.filter((item: any) => {
      return item.atlas_id == this.searchatlasId!
    })
    let newArray = array.filter((item: any) => {
      // console.log('item reduce', item.atlas_id !== this.searchatlasId, item);
      return item.atlas_id !== this.searchatlasId!
    })
    // console.log(' filter res', prodigal, newArray);

    newArray.unshift(prodigal[0])
    // console.log(' mutated res', newArray);

    return newArray
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
  searchVendorId(id: any) {
    this.canOrder = false
    console.log('ready to search', id)
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        if (result.status) {
          console.log('result came', result.data)
          this.isMod = true

          this.tableData = result.data

          if (this.searchatlasId) {
            this.dataSrc = new MatTableDataSource<PeriodicElement>(
              this.filterTop(result.data),
            )
          } else {
            this.dataSrc = new MatTableDataSource<PeriodicElement>(result.data)
          }
          this.canOrder = true
          this.dataSrc.sort = this.sort
          this.dataSrc.paginator = this.paginator
          $('table-ctn').addClass('highlight')
        } else {
          // this.toastr.info(`Something went wrong`, 'Error');
        }
      })
      .catch((err) => {
        // this.toastr.info(`Something went wrong`, 'Error');
      })
  }
  arrIntConverter(arr: any, x: any) {
    for (var i = 0; i < arr.length; i++) {
      let Obj = arr[i]
      let pre = Obj[`${x}`]
      pre.toString()
      Obj[`${x}`] = Obj[`${x}`].substring(pre.indexOf('-' + 1))
      console.log('object & string', Obj, pre, Obj[`${x}`])
    }
    console.log('new array', arr)
    return arr
  }
  getProductByVendorId() {
    this.canOrder = false
    this.isMod = false
    let id = this.vendor.nativeElement.value
    this.getData
      .httpGetRequest('/get-vendor-products/' + id)
      .then((result: any) => {
        console.log(result, 'promotion')

        if (result.status) {
          console.log('search vendor res', result.data)
          this.tableData = result.data
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

  runCalc(product: any, qty: any, i: any) {
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
    let groupProd: any = []
    let grpProdAval = false
    //check if in cart
    function checkInCartStatus(id: any) {
      console.log('entered check status', arrHist, arrHist.length > 0)

      if (arrHist.length > 0) {
        for (let y = 0; y < arrHist.length; y++) {
          console.log('check cart mut', id, arrHist[y].atlas_id)

          if (arrHist[y]?.atlas_id == id) {
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
        loc: i,
        qty: qty,
        price: '0',
        reg: product.booking,
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
              console.log('new array', arr)
              arr = arr.splice(j, 1)
            }
          }
        }
        return arr
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
              let mutArray: any = cart
              console.log('mutArrray assort', mutArray, arrHist, cart)
              //check if items in cart are in thesame group
              let groupQty = qty
              for (var j = 0; j < mutArray?.length; j++) {
                let Obj = mutArray[j]!
                if (product?.grouping) {
                  console.log(
                    'hit grouping',
                    product?.grouping,
                    Obj?.groupings,
                    Obj,
                  )
                  if (Obj?.groupings == grp) {
                    groupQty = qty + Obj.qty
                    console.log('finding group', groupQty + Obj.qty, Obj.qty)
                    groupProd.push(Obj.atlas_id)
                  }
                }
              }
              console.log(
                'compaer group with spec',
                groupQty,
                qty,
                priceSummary.specCond,
              )

              //hit assorted qty condition
              if (groupQty >= priceSummary.specCond) {
                grpProdAval = true
                total = qty * priceSummary.specPrice
                usedVar.unit_price = priceSummary.specPrice.toString()
                console.log('entered ', total)
                //resolve for others
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
        } else if (qty == 0) {
          if (cart?.length > 0) {
            for (var j = 0; j < cart?.length; j++) {
              let Obj: any = cart[j]!
              if (Obj?.atlas_id == product.atlas_id) {
                console.log('new cartay', cart)
                cart = cart.splice(j, 1)
              }
            }
          }
        } else if (qty == '') {
          if (cart?.length > 0) {
            for (var j = 0; j < cart?.length; j++) {
              let Obj: any = cart[j]!
              if (Obj?.atlas_id == product.atlas_id) {
                console.log('new cartay', cart)
                cart = cart.splice(j, 1)
              }
            }
          }
        } else if (qty == '0') {
          if (cart?.length > 0) {
            for (var j = 0; j < cart?.length; j++) {
              let Obj: any = cart[j]!
              if (Obj?.atlas_id == product.atlas_id) {
                console.log('new cartay', cart)
                cart = cart.splice(j, 1)
              }
            }
          }
        }
        total = parseFloat(total.toFixed(2))
        usedVar.price = total.toString()
      }

      calcTotal()
      //issue dey here
      if (grpProdAval) {
        console.log('group', groupProd[0], groupProd)
        let val = groupProd[0]
        for (let i = 0; i < this.orderTable.length; i++) {
          let obj: any = this.orderTable[i]
          if (obj.atlas_id == val) {
            obj.price = priceSummary.specPrice * obj.qty
            this.dataSrc.data[obj.loc].extended =
              priceSummary.specPrice * obj.qty
          }
        }
      } else {
        for (var j = 0; j < cart?.length; j++) {
          let Obj: any = cart[j]!
          if (product?.grouping) {
            console.log('hit grouping', product?.grouping, Obj?.groupings, Obj)
            if (Obj?.groupings == grp) {
              console.log('finding group', Obj.qty)
              groupProd.push(Obj.atlas_id)
            }
          }
        }
        console.log('group else', groupProd[1], groupProd)
        let val
        if (groupProd[1] == '998-2') {
          val = '998-3'
        } else if (groupProd[1] == '998-3') {
          val = '998-2'
        }
        for (let i = 0; i < this.orderTable.length; i++) {
          let obj: any = this.orderTable[i]
          if (obj.atlas_id == val) {
            obj.price = obj.booking * obj.qty
            this.dataSrc.data[obj.loc].extended = obj.booking * obj.qty
          }
        }
      }
      this.orderTable = replaceOldVal(this.orderTable)
      console.log('userobj', usedVar, 'table', this.orderTable)
      this.orderTable.push(usedVar)
      this.getTotal()
      this.dataSrc.data[i].extended = total
      // if (posssibleBreak && qty > priceSummary.specCond) {
      //   this.dataSrc.data[i].booking = priceSummary.specPrice;
      // } else {
      //    this.dataSrc.data[i].booking = priceSummary.specPrice;
      // }

      this.dataSrc.sort = this.sort
      this.dataSrc.paginator = this.paginator
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
      this.toastr.info(``, 'This item is already in order')
    }
  }
  submitOrder() {
    this.cartLoader = true
    this.orderSuccess = false

    let uid = this.token.getUser().id.toString()
    let accntId = this.token.getUser().account_id
    this.orderLen = this.orderTable.length
    if (this.orderTable.length > 0) {
      for (let i = 0; i < this.orderTable.length; i++) {
        let pbj: any = this.orderTable[i]
        delete pbj?.loc
      }
      let formdata = {
        uid: uid,
        dealer: accntId,
        product_array: JSON.stringify(this.orderTable),
      }
      this.getData
        .httpPostRequest('/add-item-to-cart', formdata)
        .then((result: any) => {
          if (result.status) {
            this.cartLoader = false
            this.orderSuccess = true
            this.toastr.success(
              `${this.orderLen}  item(s) have been added to cart`,
              'Success',
            )
            this.orderTable = []
            this.getTotal()
            this.getCart()
            if (this.searchatlasId) {
              this.searchVendorId(this.vendorId!)
            } else {
              this.getProductByVendorId()
            }
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
  parser(data: any) {
    return JSON.parse(data)
  }
  async confirmBox() {
    return await Swal.fire({
      title: 'You Are About To Remove This Item From Cart',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        return true
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false
      } else {
        return false
      }
    })
  }

  async emptyCartConfirmBox() {
    return await Swal.fire({
      title: 'Are You Sure You Want To Empty Your Cart ?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        return true
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false
      } else {
        return false
      }
    })
  }
}
