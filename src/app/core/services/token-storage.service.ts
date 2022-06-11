import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  static getBranch(): any {
    throw new Error('Method not implemented.')
  }
  constructor() {}

  public getToken(): string | null {
    return window.localStorage.getItem('token')
  }

  public save(data: any, token: any): void {
    console.log(data)
    if (data.role == '4') {
      window.localStorage.removeItem('dealer')
      window.localStorage.setItem('dealer', JSON.stringify(data))
      window.localStorage.setItem('token', token)
    }

    if (data.role == '1') {
      window.localStorage.removeItem('admin')
      window.localStorage.setItem('admin', JSON.stringify(data))
      window.localStorage.setItem('token', token)
    }
    if (data.role == '2') {
      window.localStorage.removeItem('branch')
      window.localStorage.setItem('branch', JSON.stringify(data))
      window.localStorage.setItem('token', token)
    }
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

  updateStoreAdmin(admin: any) {
    window.localStorage.removeItem('admin')
    window.localStorage.setItem('admin', JSON.stringify(admin))
  }

  updateStoreDealer(dealer: any) {
    window.localStorage.removeItem('dealer')
    window.localStorage.setItem('dealer', JSON.stringify(dealer))
  }
  updateStoreBranch(branch: any) {
    window.localStorage.removeItem('branch')
    window.localStorage.setItem('branch', JSON.stringify(branch))
  }

  isLoggedInAsDealer(): boolean {
    const admin = localStorage.getItem('dealer')
    const token = localStorage.getItem('token')
    return admin !== null && token !== null ? true : false
  }

  isLoggedInAsAdmin(): boolean {
    const admin = localStorage.getItem('admin')
    const token = localStorage.getItem('token')
    return admin !== null && token !== null ? true : false
  }
  isLoggedInAsBranch(): boolean {
    const branch = localStorage.getItem('branch')
    const token = localStorage.getItem('token')
    return branch !== null && token !== null ? true : false
  }

  signOut(): void {
    window.localStorage.clear()
  }

  getDealer() {
    const dealer = window.localStorage.getItem('dealer')
    if (dealer) {
      return JSON.parse(dealer)
    }
    return {}
  }
  getBranch() {
    const branch = window.localStorage.getItem('branch')
    if (branch) {
      return JSON.parse(branch)
    }
    return {}
  }
  public getAdmin(): any {
    const admin = window.localStorage.getItem('admin')
    if (admin) {
      return JSON.parse(admin)
    }
    return {}
  }

  public getrole() {}

  public permissions() {
    const permissions = window.localStorage.getItem('permissions')
    if (permissions) {
      return JSON.parse(permissions)
    }
    return {}
  }
}
