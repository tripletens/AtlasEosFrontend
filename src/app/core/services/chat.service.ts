import { Injectable } from '@angular/core'
import { io } from 'socket.io-client'
import { Observable } from 'rxjs'
import { TokenStorageService } from './token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // private url = 'http://localhost:3000'
  private url = 'https://atlas-chat-server.glitch.me'
  // private url = 'https://gainful-ten-utahraptor.glitch.me'
  private socket: any

  constructor(private tokenStorage: TokenStorageService) {
    this.connectToSocketIo()
  }

  connectToSocketIo() {
    let socketUrl
    this.socket = io(this.url)
    this.socket.on('connect', () => {
      socketUrl = this.socket.id
      this.tokenStorage.storeSocketId(socketUrl)
    })
  }

  openChatConnection(user: string) {
    this.socket.emit('connected', user)
  }

  sendMsgEvent(data: any) {
    this.socket.emit('send-msg', {
      user: data.user,
      msg: data.msg,
    })
  }

  sendMessage(message: string) {
    this.socket.emit('new-message', message)
  }

  getTestMsg = () => {
    return Observable.create((observer: any) => {
      this.socket.on('data', (message: any) => {
        console.log(message)
        observer.next(message)
      })
    })
  }

  getMessages = () => {
    return Observable.create((observer: any) => {
      this.socket.on('msgRec', (message: any) => {
        console.log(message)
        observer.next(message)
      })
    })
  }
}
