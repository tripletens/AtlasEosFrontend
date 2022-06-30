import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { ChatService } from 'src/app/core/services/chat.service'
import { io } from 'socket.io-client'
import { ScrollBottomDirective } from 'src/app/core/directives/scroll-bottom.directive'

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.scss'],
})
export class MyMessagesComponent implements OnInit {
  tableView = true
  loader = false
  allUsers: any
  selectedUserData: any
  messages: any[] = []
  chats: string[] = []
  msg = ''
  uniqueUserId!: string
  userId!: string
  loggedInUser: any

  vendorCode!: string
  coworkersData: any
  userData: any
  userSelected = false
  coworkerLoader = true
  chatHistoryLoader = false
  userHasBeenSelected = false
  allDealers: any
  selectedDealerUser: any
  showUnreadMsg = false
  unreadMsgData: any
  adminUserData: any
  allVendors: any
  selectedVendorUsers: any

  vendorUnreadMsg: any
  showVenorUnreadMsg = false

  showDealerUnreadMsg = false
  dealerUnreadMsg: any

  @ViewChild('chatWrapper') private chatWrapper!: ElementRef

  constructor(
    private postData: HttpRequestsService,
    private tokeStore: TokenStorageService,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.getAllDealers()
    this.chatService.getMessages().subscribe((message: string) => {
      if (message != '') {
        setTimeout(() => {
          this.scrollToElement()
        }, 80)
      }

      if (this.userHasBeenSelected) {
        this.getMsgAsync()
      }

      this.messages.push(message)
    })

    this.loggedInUser = this.tokeStore.getUser()
    let user = this.tokeStore.getUser()
    this.userData = this.tokeStore.getUser()

    this.userId = user.id
    let userId = user.id + user.first_name
    this.uniqueUserId = userId
    this.vendorCode = user.vendor_code

    this.getVendorCoworkers()

    this.chatService.openChatConnection(userId)
    this.getVendorUnreadMsg()
    this.getAllDamin()
    this.getAllVendors()
    this.getDealerUnreadMsg()
  }

  getAllSelectedVendorUsers(data: any) {
    this.coworkerLoader = true
    this.selectedVendorUsers = []
    this.postData
      .httpGetRequest(
        '/dealer/get-selected-company-vendor/' +
          data.vendor_code +
          '/' +
          this.userId,
      )
      .then((result: any) => {
        this.coworkerLoader = false
        if (result.status) {
          this.getVendorUnreadMsg()

          this.selectedVendorUsers = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getAllVendors() {
    this.postData
      .httpGetRequest('/dealer/get-vendors')
      .then((result: any) => {
        if (result.status) {
          this.allVendors = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getAllDamin() {
    this.postData
      .httpGetRequest('/get-all-admin-users/' + this.userId)
      .then((result: any) => {
        if (result.status) {
          this.adminUserData = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getDealerUnreadMsg() {
    this.postData
      .httpGetRequest('/admin/get-dealer-unread-msg/' + this.userId)
      .then((result: any) => {
        if (result.status) {
          this.showDealerUnreadMsg = result.data.length > 0 ? true : false

          this.dealerUnreadMsg = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getVendorUnreadMsg() {
    this.postData
      .httpGetRequest('/admin/get-vendor-unread-msg/' + this.userId)
      .then((result: any) => {
        if (result.status) {
          this.showVenorUnreadMsg = result.data.length > 0 ? true : false

          this.vendorUnreadMsg = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getAllSelectedDealerUsers(data: any) {
    this.coworkerLoader = true
    this.selectedDealerUser = []
    this.postData
      .httpGetRequest(
        '/vendor/get-selected-company-dealers/' +
          data.account_id +
          '/' +
          this.userId,
      )
      .then((result: any) => {
        this.coworkerLoader = false
        if (result.status) {
          this.getVendorUnreadMsg()

          this.selectedDealerUser = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getAllDealers() {
    this.postData
      .httpGetRequest('/vendor/get-dealers')
      .then((result: any) => {
        if (result.status) {
          this.allDealers = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  bellNotification() {}

  scrollToElement(): void {
    this.chatWrapper.nativeElement.scroll({
      top: this.chatWrapper.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  sendMsg() {
    if (this.msg != '') {
      let data = {
        user: this.selectedUserData.id + this.selectedUserData.first_name,
        msg: this.msg,
      }

      this.storeChatDatabase()
      this.messages.push(data)
      this.chatService.sendMsgEvent(data)
      setTimeout(() => {
        this.scrollToElement()
      }, 80)
      this.msg = ''
    }
  }

  getUserChat() {
    this.postData
      .httpGetRequest(
        '/get-user-chat/' + this.userId + '/' + this.selectedUserData.id,
      )
      .then((result: any) => {
        console.log(result)
        this.chatHistoryLoader = false
        this.getVendorAsync()

        if (result.status) {
          if (result.data.length > 0) {
            this.messages = result.data
            setTimeout(() => {
              this.scrollToElement()
            }, 100)
          }
        } else {
        }
      })
      .catch((err) => {})
  }

  storeChatDatabase() {
    let data = {
      chatFrom: this.userId,
      chatTo: this.selectedUserData.id,
      msg: this.msg,
      chatUser: this.selectedUserData.id + this.selectedUserData.first_name,
      uniqueId:
        this.userData.id +
        this.userData.first_name +
        this.selectedUserData.id +
        this.selectedUserData.first_name,
    }

    this.postData
      .httpPostRequest('/store-chat', data)
      .then((result: any) => {
        console.log(result)
        if (result.status) {
          //  this.toastr.success(result.message, `Successful`)
        } else {
          ////this.toastr.error(result.message, 'Try again')
        }
      })
      .catch((err) => {})
  }

  selectedUser(data: any) {
    this.selectedUserData = data
    this.userSelected = true
    this.chatHistoryLoader = true
    this.userHasBeenSelected = true
    this.messages = []
    this.getUserChat()
  }

  generateSocketId() {
    let data = {
      id: this.selectedUserData.id,
      chatId: this.selectedUserData.chat_id,
    }
  }

  getVendorCoworkers() {
    this.postData
      .httpGetRequest(
        '/vendor/get-vendor-coworkers/' + this.vendorCode + '/' + this.userId,
      )
      .then((result: any) => {
        if (result.status) {
          this.coworkerLoader = false
          this.coworkersData = result.data
          //let sortedData = this.alphabeticalOrder(result.data)

          // this.allUsers = result.data
        } else {
        }
      })
      .catch((err) => {})
  }

  getMsgAsync() {
    this.postData
      .httpGetRequest(
        '/get-user-chat/' + this.userId + '/' + this.selectedUserData.id,
      )
      .then((result: any) => {
        this.chatHistoryLoader = false
        this.getVendorAsync()
      })
      .catch((err) => {})
  }

  getVendorAsync() {
    this.postData
      .httpGetRequest(
        '/vendor/get-vendor-coworkers/' + this.vendorCode + '/' + this.userId,
      )
      .then((result: any) => {
        if (result.status) {
          this.coworkersData = result.data
        } else {
        }
      })
      .catch((err) => {})
  }
}
