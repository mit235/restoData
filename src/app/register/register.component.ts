import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RestoService } from '../resto.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  alert: boolean = false;
  isError: boolean = false;
  // isRegister = new BehaviorSubject<boolean>(true);
  disLogin = true;
  register = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private resto: RestoService, private route: Router) {}

  collection() {
    this.resto.registerUser(this.register.value);

    this.alert = true;
  }
  closeAlert() {
    this.alert = false;
    this.register.reset({});
  }

  showLogin() {
    this.disLogin = false;
  }
  blLogin() {
    this.disLogin = true;
  }

  loginSend() {
    // console.warn(this.login.value)
    this.resto.userLogin(this.login.value);
    // this.isError=this.resto.isInvalid;
    // console.warn(this.resto.isInvalid)
    this.resto.isError.subscribe((result) => {
      this.isError = result;
    });
  }
}
