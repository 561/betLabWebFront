import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isMobileValue = false;

  constructor() {
    this.isMobileValue = window.innerWidth < 1080;
  }

  isMobile(): boolean {
    return this.isMobileValue;
  }
}
