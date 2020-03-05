import { Injectable } from '@angular/core';


@Injectable({providedIn: 'root'})
export class ActiveUserService {
  inactiveInterval: any;
  inactiveTimeout: any;
  inactiveTime: number = 0;

  
  setInactiveTimeout = () => {
    this.setInactiveInterval();
    this.inactiveTimeout = setTimeout(() => {
      console.log('time to sleep...');
    }, 10000);
  }
  
  clearInactiveTimeout() {
    clearTimeout(this.inactiveTimeout);
  }
  
  
  setInactiveInterval = () => {
    this.inactiveInterval = setInterval(() => {
      this.inactiveTime++
    }, 1000);
  }
  
  clearInactiveInterval() {
    clearInterval(this.inactiveInterval);
  }

}