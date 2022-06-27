import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

import { ChatService } from 'src/app/core/services/chat.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  allUsers: any
  selectedUserData: any
  messages: any[] = []
  loggedInUser: any

  msg = ''
  uniqueUserId!: string
  userId!: string
  vendorCode!: string
  coworkersData: any
  userData: any
  userSelected = false
  coworkerLoader = true
  chatHistoryLoader = false
  userHasBeenSelected = false

  @ViewChild('chatWrapper') private chatWrapper!: ElementRef
  @ViewChild('audioTag') private audioTag!: ElementRef

  constructor(
    private postData: HttpRequestsService,
    private chatService: ChatService,
    private tokeStore: TokenStorageService,
    private toaster: ToastrService,
  ) {}
  ngOnInit(): void {
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
      console.log(this.messages)
    })

    this.chatService.getNotification().subscribe((data: any) => {
      console.log(data)
      this.getVendorAsync()
      this.toaster.success('you have a new message', 'Chat Notification')
      this.bellNotification()
      this.audioTag.nativeElement.play()
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
    // this.getUserChat()
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

          this.allUsers = result.data
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
