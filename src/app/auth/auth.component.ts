import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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
    
    if(this.isLoginMode) {
      // TODO: login
    } else {
      // this.authService.signup(email, password).subscribe(response => {
      //   console.log(response);
        
      // });
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log('resData ', resData);
        },
        errorMessage => {
          console.log('errorMessage: ', errorMessage);
          this.error = errorMessage;
        }
      );
    }

    form.reset();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

}
