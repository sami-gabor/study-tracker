import { Component, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { StudentsSetvice } from './students.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck, OnInit, OnDestroy {
  title: string = 'study-tracker';
  settingsAreVisible: boolean = true;
  /*
  Logout user after "autoLogoutMiliSeconds" of inactivity
  Inactivity is considered when the user doesn't interact with the app
  random clicks don't count
  */
  inactiveInterval: any;
  isLogged: boolean;
  autoLogoutMiliSeconds: number = 5000;

  constructor() { }

  ngDoCheck() {
    if (this.isLogged) {
      this.clearInactiveInterval();
      this.setInactiveInterval();
    }
    // console.log('Logged: ', this.isLogged);
  }

  ngOnInit() {
    this.login();
  }

  ngOnDestroy() {
    this.logout();
  }

  setInactiveInterval = () => {
    this.inactiveInterval = setInterval(() => {
      this.logout();
    }, this.autoLogoutMiliSeconds);
  }

  clearInactiveInterval() {
    clearInterval(this.inactiveInterval);
  }

  login() {
    this.isLogged = true;
    this.setInactiveInterval();
    // console.log('Logged in!');
  }

  logout() {
    this.isLogged = false;
    this.clearInactiveInterval();
    // console.log('Logged out!');
  }

}
