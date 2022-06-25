import { Injectable } from '@angular/core';
import { io } from 'socket.io-client'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = 'http://localhost:3000'
  // private url = 'https://atlas-chat-server.glitch.me'
  // private url = 'https://gainful-ten-utahraptor.glitch.me'
  private socket

  constructor() {
    this.socket = io(this.url)

    this.socket.on('connect', () => {
      console.log(this.socket.id)
    })
  }

  public sendMessage(message: string) {
    this.socket.emit('new-message', message)
  }

  public getMessages = () => {
    return Observable.create((observer: any) => {
      this.socket.on('data', (message) => {
        console.log(message)
        observer.next(message)
      })
    })
  }

}
