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

  @ViewChild('chatWrapper') private chatWrapper!: ElementRef

  constructor(
    private postData: HttpRequestsService,
    private tokeStore: TokenStorageService,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.getUsers()

    let user = this.tokeStore.getUser()
    this.userId = user.id

    console.log(user)

    let userId = user.id + user.first_name
    this.uniqueUserId = userId
    this.chatService.openChatConnection(userId)
    this.getUserChat()

    this.chatService.getMessages().subscribe((message: string) => {
      this.messages.push(message)
      console.log(this.messages)
    })
  }

  scrollToElement(): void {
    this.chatWrapper.nativeElement.scroll({
      top: this.chatWrapper.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
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
            // this.chatWrapper.nativeElement.scrollHeight
          }
        } else {
        }
      })
      .catch((err) => {})
  }

  storeChatDatabase() {
    let data = {
      chatFrom: this.userId,
      chatTo: 712,
      msg: this.msg,
      chatUser: '712tesr',
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

  sendMsg() {
    let data = {
      user: '712tesr',
      msg: this.msg,
    }

    this.messages.push(data)
    this.storeChatDatabase()
    this.chatService.sendMsgEvent(data)
    setTimeout(() => {
      this.scrollToElement()
    }, 80)
    this.msg = ''
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
