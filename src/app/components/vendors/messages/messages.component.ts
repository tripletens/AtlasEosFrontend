import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { HttpRequestsService } from 'src/app/core/services/http-requests.service'

import { ChatService } from 'src/app/core/services/chat.service'
import { TokenStorageService } from 'src/app/core/services/token-storage.service'

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

  @ViewChild('chatWrapper') private chatWrapper!: ElementRef

  constructor(
    private postData: HttpRequestsService,
    private chatService: ChatService,
    private tokeStore: TokenStorageService,
  ) {}
  ngOnInit(): void {
    this.getUsers()

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message)
      console.log(this.messages)
    })

    this.loggedInUser = this.tokeStore.getUser()
    let user = this.tokeStore.getUser()
    this.userId = user.id
    let userId = user.id + user.first_name
    this.uniqueUserId = userId

    this.chatService.openChatConnection(userId)
    this.getUserChat()
  }

  scrollToElement(): void {
    this.chatWrapper.nativeElement.scroll({
      top: this.chatWrapper.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  sendMsg() {
    let data = {
      user: '1Jo-ann',
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

  getUserChat() {
    this.postData
      .httpGetRequest('/get-user-chat/' + this.userId)
      .then((result: any) => {
        console.log(result)
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
      chatTo: 1,
      msg: this.msg,
      chatUser: '1Jo-ann',
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
    if (!data.chat_id) {
      console.log('no chat id')
    } else {
      console.log('chat id')
    }

    console.log(data)
  }

  generateSocketId() {
    let data = {
      id: this.selectedUserData.id,
      chatId: this.selectedUserData.chat_id,
    }
  }

  getUsers() {
    this.postData
      .httpGetRequest('/get-all-users')
      .then((result: any) => {
        if (result.status) {
          //let sortedData = this.alphabeticalOrder(result.data)

          this.allUsers = result.data
        } else {
        }
      })
      .catch((err) => {})
  }
}
