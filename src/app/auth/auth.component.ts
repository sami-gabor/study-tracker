import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    
    if(this.isLoginMode) {
      authObs = this.authService.signin(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => console.log('resData ', resData),
      errorMessage => {
        console.log('errorMessage: ', errorMessage);
        this.error = errorMessage;
      }
    )

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
