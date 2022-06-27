import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  static getBranch(): any {
    throw new Error('Method not implemented.')
  }
  constructor() {}

  public storeSocketId(socketId: string) {
    window.localStorage.setItem('socketid', socketId)
  }

  public getSocketId() {
    const socketId = window.localStorage.getItem('socketid')
    if (socketId) {
      return socketId
    }
    return ''
  }

  public getToken(): string | null {
    return window.localStorage.getItem('token')
  }

  public save(data: any, token: any): void {
    window.localStorage.removeItem('user')
    window.localStorage.setItem('user', JSON.stringify(data))
    window.localStorage.setItem('token', token)

    // window.localStorage.removeItem('token');
    // if (data.admin) {
    //   window.localStorage.setItem('admin', JSON.stringify(data.admin));
    // }

    // if (data.dealer) {
    //             window.localStorage.setItem(
    //               'dealer',
    //               JSON.stringify(data.dealer)
    //             );

    // }
  }

  updateStoreUser(dealer: any) {
    window.localStorage.removeItem('dealer')
    window.localStorage.setItem('dealer', JSON.stringify(dealer))
  }

  isLoggedIn(): boolean {
    const admin = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    return admin !== null && token !== null ? true : false
  }

  signOut(): void {
    window.localStorage.clear()
  }

  getUser() {
    const dealer = window.localStorage.getItem('user')
    if (dealer) {
      return JSON.parse(dealer)
    }
    return {}
  }

  public permissions() {
    const permissions = window.localStorage.getItem('permissions')
    if (permissions) {
      return JSON.parse(permissions)
    }
    return {}
  }
}
